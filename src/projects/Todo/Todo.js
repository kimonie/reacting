import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Todo.css';

function Todo() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const addTask = () => {
    if (input.trim() === '') return;
    const newTask = {
      id: `task-${Date.now()}`,
      text: input,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const handleSaveEdit = () => {
    if (editingText.trim() === '') return;
    setTasks(tasks.map(task =>
      task.id === editingId ? { ...task, text: editingText } : task
    ));
    setEditingId(null);
    setEditingText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div className={`todo-page ${darkMode ? 'dark' : ''}`}>
      <div className="todo-container">
        <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>

        <h2>📝 To-Do List</h2>

        <div className="input-section">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTask();
            }}
            placeholder="Add a task..."
          />
          <button onClick={addTask}>Add</button>
        </div>


        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />

              {editingId === task.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={handleSaveEdit}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit();
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                  autoFocus
                  className="edit-input"
                />
              ) : (
                <div className="task-content">
                  <span
                    onClick={() => !task.completed && handleEdit(task)}
                    className={`editable-text ${task.completed ? 'disabled' : ''}`}
                    title={task.completed ? "Can't edit completed task" : "Click to edit"}
                  >
                    {task.text}
                  </span>
                  {!task.completed && (
                    <button
                      onClick={() => handleEdit(task)}
                      className="edit-button"
                      title="Edit"
                    >
                      ✏️
                    </button>
                  )}
                </div>
              )}

              <button className="delete-btn" onClick={() => deleteTask(task.id)}>❌</button>
            </li>
          ))}
        </ul>

        <div>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default Todo;
