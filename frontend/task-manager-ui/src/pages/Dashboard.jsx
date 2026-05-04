import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = () => {
    API.get("/tasks").then(res => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!title) return;

    await API.post("/tasks", {
      title,
      status: "Todo"
    });

    setTitle("");
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, JSON.stringify(status), {
      headers: { "Content-Type": "application/json" }
    });

    fetchTasks();
  };

  const completed = tasks.filter(t => t.status === "Done").length;
  const pending = tasks.length - completed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">

        {/* HEADER */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Dashboard
        </h2>

        {/* STATS CARDS */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <p className="text-gray-500">Total</p>
            <h2 className="text-3xl font-bold">{tasks.length}</h2>
          </div>

          <div className="bg-green-100 rounded-xl shadow-md p-4 text-center">
            <p className="text-green-700">Completed</p>
            <h2 className="text-3xl font-bold">{completed}</h2>
          </div>

          <div className="bg-yellow-100 rounded-xl shadow-md p-4 text-center">
            <p className="text-yellow-700">Pending</p>
            <h2 className="text-3xl font-bold">{pending}</h2>
          </div>
        </div>

        {/* CREATE TASK */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex gap-3">
          <input
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createTask}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        {/* TASK LIST */}
        <div className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-center text-gray-500">No tasks found</p>
          )}

          {tasks.map(task => (
            <div
              key={task.id}
              className={`flex justify-between items-center p-4 rounded-xl shadow-md transition
              ${task.status === "Done"
                ? "bg-green-50 border-l-4 border-green-500"
                : "bg-white"}`}
            >
              <p className="font-medium text-gray-800">{task.title}</p>

              <select
                value={task.status}
                onChange={(e) => updateStatus(task.id, e.target.value)}
                className="border rounded-lg px-2 py-1"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}