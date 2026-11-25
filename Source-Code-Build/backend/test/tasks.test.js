const { test } = require("node:test");
const assert = require("node:assert/strict");
const { createApp } = require("../index");

test("local task CRUD and readiness", async t => {
    const server = createApp({ local: true }).listen(0, "127.0.0.1");
    t.after(() => server.close());
    await new Promise(resolve => server.once("listening", resolve));
    const base = "http://127.0.0.1:" + server.address().port;
    const send = (path, method, body) => fetch(base + path, { method, headers: { "Content-Type": "application/json" }, body: body && JSON.stringify(body) });
    assert.equal((await fetch(base + "/ready")).status, 200);
    const created = await send("/api/tasks", "POST", { task: "local demo" });
    assert.equal(created.status, 201);
    const task = await created.json();
    assert.equal((await (await fetch(base + "/api/tasks")).json()).length, 1);
    assert.equal((await (await send("/api/tasks/" + task._id, "PUT", { completed: true })).json()).completed, true);
    assert.equal((await send("/api/tasks/" + task._id, "DELETE")).status, 200);
    assert.equal((await (await fetch(base + "/api/tasks")).json()).length, 0);
});
