import React from "react";
import Tasks from "./Tasks";
import "./App.css";

class App extends Tasks {
    state = { tasks: [], currentTask: "" };

    render() {
        const { tasks, currentTask } = this.state;
        return (
            <div className="app">
                <header className="app-header">
                    <h1>My To-Do List</h1>
                </header>
                <div className="main-content">
                    <section className="todo-container" aria-label="Task list">
                        <form onSubmit={this.handleSubmit} className="task-form">
                            <input
                                type="text"
                                aria-label="New task"
                                className="task-input"
                                value={currentTask}
                                required={true}
                                onChange={this.handleChange}
                                placeholder="Add New TO-DO"
                            />
                            <button className="add-task-btn" type="submit">
                                Add Task
                            </button>
                        </form>
                        <div className="tasks-list">
                            {tasks.map((task) => (
                                <div key={task._id} className="task-item">
                                    <input
                                        type="checkbox"
                                        aria-label={`Mark ${task.task} complete`}
                                        checked={task.completed}
                                        onChange={() => this.handleUpdate(task._id)}
                                    />
                                    <div className={task.completed ? "task-text completed" : "task-text"}>
                                        {task.task}
                                    </div>
                                    <button type="button" onClick={() => this.handleDelete(task._id)} className="delete-task-btn">
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default App;

