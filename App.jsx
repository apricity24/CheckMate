
import { useState, useEffect } from "react";
import { Moon, Sun, Plus, Trash2, Check, Star } from "lucide-react";

const getSavedTasks = () => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
};

export default function App() {
  const [tasks, setTasks] = useState(getSavedTasks);
  const [input, setInput] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className={dark ? "bg-gray-900 text-white" : "bg-white text-black"}>
      <div className="min-h-screen p-6 max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Pro To-Do</h1>
          <button onClick={() => setDark(!dark)}>
            {dark ? <Sun /> : <Moon />}
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
            placeholder="Add a task..."
          />
          <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded">
            <Plus />
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-3 rounded shadow ${
                task.done ? "bg-green-100 line-through" : "bg-gray-100"
              }`}
            >
              <span>{task.text}</span>
              <div className="flex gap-2">
                <button onClick={() => toggleTask(task.id)}>
                  <Check className="text-green-600" />
                </button>
                <button onClick={() => deleteTask(task.id)}>
                  <Trash2 className="text-red-600" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
