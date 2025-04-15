import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editInput, setEditInput] = useState('');

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const trimmedTask = taskInput.trim();
    if (trimmedTask) {
      const newTask = {
        text: trimmedTask,
        createdAt: new Date().toLocaleString(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    } else {
      alert('Please enter a task!');
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditInput(tasks[index].text);
  };

  const saveEdit = (index) => {
    const trimmedInput = editInput.trim();
    if (trimmedInput) {
      const updatedTasks = [...tasks];
      updatedTasks[index] = {
        ...updatedTasks[index],
        text: trimmedInput,
        createdAt: new Date().toLocaleString(), // Update timestamp
      };
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditInput('');
    } else {
      alert('Task cannot be empty!');
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditInput('');
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-200 via-sky-600 to-sky-900">
      <div className="bg-gray-200 p-5 rounded-2xl w-full max-w-md mx-4 border-2">
        <h1 className="text-2xl font-bold text-purple-700 text-center mb-4">To-Do List</h1>

        <div className="flex mb-3">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add your Task here"
            className="flex-grow px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
          />
          <button
            onClick={addTask}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r"
          >
            Add
          </button>
        </div>

        <ul className="mt-6 space-y-2">
          {tasks.map((task, index) => (
            <li key={index} className="flex items-center justify-between bg-amber-100 rounded p-2 border-1">
              
              {editingIndex === index ? (
                <div className="flex-grow">
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    className="w-full px-2 py-1 rounded border border-gray-300"
                  />
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => saveEdit(index)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-grow">
                  <span className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.text}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">{task.createdAt}</div>
                </div>
              )}
          
              {editingIndex !== index && (
                <div className="flex items-center space-x-2 ml-2">
                <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(index)}
                className="mr-2 w-7 h-7 accent-green-600"
              />
                  <button
                    onClick={() => startEditing(index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
