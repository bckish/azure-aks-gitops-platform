const express = require("express");
const { randomUUID } = require("node:crypto");
const Task = require("../models/task");

function memoryStore() {
    const tasks = new Map();
    return {
        list: async () => [...tasks.values()],
        add: async data => {
            const task = { _id: randomUUID(), completed: false, ...data };
            tasks.set(task._id, task);
            return task;
        },
        update: async (id, data) => {
            if (!tasks.has(id)) return null;
            const task = { ...tasks.get(id), ...data };
            tasks.set(id, task);
            return task;
        },
        remove: async id => {
            const task = tasks.get(id);
            tasks.delete(id);
            return task || null;
        }
    };
}
function mongoStore() {
    return {
        list: () => Task.find(),
        add: data => new Task(data).save(),
        update: (id, data) => Task.findByIdAndUpdate(id, data, { returnDocument: "after", runValidators: true }),
        remove: id => Task.findByIdAndDelete(id)
    };
}
function createTaskRouter(store) {
    const router = express.Router();
    const handle = fn => async (req, res) => {
        try { await fn(req, res); }
        catch (error) { res.status(error.name === "CastError" ? 400 : 500).json({ error: "Unable to process task" }); }
    };
    router.get("/", handle(async (req, res) => res.json(await store.list())));
    router.post("/", handle(async (req, res) => {
        const task = typeof req.body.task === "string" ? req.body.task.trim() : "";
        if (!task || task.length > 1000) return res.status(400).json({ error: "Task must contain 1–1000 characters" });
        res.status(201).json(await store.add({ task }));
    }));
    router.put("/:id", handle(async (req, res) => {
        if (typeof req.body.completed !== "boolean") return res.status(400).json({ error: "completed must be a boolean" });
        const task = await store.update(req.params.id, { completed: req.body.completed });
        return task ? res.json(task) : res.status(404).json({ error: "Not found" });
    }));
    router.delete("/:id", handle(async (req, res) => {
        const task = await store.remove(req.params.id);
        return task ? res.json(task) : res.status(404).json({ error: "Not found" });
    }));
    return router;
}
module.exports = { createTaskRouter, memoryStore, mongoStore };
