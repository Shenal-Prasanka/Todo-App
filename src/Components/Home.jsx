import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [viewingIndex, setViewingIndex] = useState(null);

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

  const toggleView = (index) => {
    setViewingIndex(viewingIndex === index ? null : index);
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

  // Split task text into multiple lines of up to 42 characters
  const splitIntoLines = (text, maxLength = 42) => {
    const lines = [];
    for (let i = 0; i < text.length; i += maxLength) {
      lines.push(text.slice(i, i + maxLength));
    }
    return lines;
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
            <li key={index} className="bg-amber-100 rounded p-3 border-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 w-1/2 overflow-hidden">
                  <span
                    className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''} 
                    truncate`}
                    style={{ maxWidth: '150px' }} // Prevent overflow and show truncated text
                  >
                    {task.text.length > 42 ? task.text.substring(0, 42) + '...' : task.text}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(index)}
                    className="w-6 h-6 accent-green-600"
                  />
                  <button
                    onClick={() => toggleView(index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    {viewingIndex === index ? 'Hide' : 'View'}
                  </button>
                  <button
                    onClick={() => deleteTask(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {viewingIndex === index && (
                <div className="mt-3 bg-white p-3 rounded shadow-sm text-sm text-gray-700">
                  <p><strong>Task:</strong></p>
                  {splitIntoLines(task.text).map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                  <p><strong>Created At:</strong> {task.createdAt}</p>
                  <p><strong>Status:</strong> {task.completed ? 'Completed' : 'Not Completed'}</p>
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
