const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const connect = require("./db");
const { createTaskRouter, memoryStore, mongoStore } = require("./routes/tasks");

function createApp({ local = false } = {}) {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.get(["/ok", "/healthz", "/started"], (req, res) => res.status(200).send("Healthy"));
    app.get("/ready", (req, res) => {
        const ready = local || mongoose.connection.readyState === 1;
        res.status(ready ? 200 : 503).send(ready ? "Ready" : "Not Ready");
    });
    app.use("/api/tasks", createTaskRouter(local ? memoryStore() : mongoStore()));
    return app;
}

async function start() {
    const local = process.env.LOCAL_MEMORY === "true";
    if (!local) {
        if (!process.env.MONGO_CONN_STR) throw new Error("Set MONGO_CONN_STR, or explicitly set LOCAL_MEMORY=true for a temporary local demo");
        await connect();
    }
    const port = process.env.PORT || 3500;
    const host = local ? "127.0.0.1" : "0.0.0.0";
    createApp({ local }).listen(port, host, () => console.log(`Listening on ${host}:${port}`));
}

if (require.main === module) start().catch(error => { console.error(error.message); process.exitCode = 1; });

module.exports = { createApp };
