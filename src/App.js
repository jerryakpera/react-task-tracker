import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  const [tasks, setTasks] = useState([]);

  const [showAddTask, setShowAddTask] = useState(false);

  // Get tasks
  const fetchTasks = async () => {
    const allTasks = await axios.get('http://localhost:5000/tasks');

    return allTasks.data;
  };

  // Get task
  const fetchTask = async (id) => {
    const task = await axios.get(`http://localhost:5000/tasks/${id}`);

    return task.data;
  };

  useEffect(() => {
    const getTasks = async () => {
      const allTasks = await fetchTasks();
      setTasks(allTasks);
    };

    getTasks();
  }, []);

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    const allTasks = await fetchTasks();
    setTasks(allTasks);
  };

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);

    const updatedTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder,
    };

    await axios.put(
      `http://localhost:5000/tasks/${updatedTask.id}`,
      updatedTask
    );

    const allTasks = await fetchTasks();
    setTasks(allTasks);
    // setTasks(
    //   tasks.map((task) => {
    //     if (task.id === id) task.reminder = !task.reminder;
    //     return task;
    //   })
    // );
  };

  // Add new task
  const addTask = async (task) => {
    const newTask = {
      id: Math.floor(Math.random() * 10000) + 1,
      ...task,
    };

    await axios.post('http://localhost:5000/tasks', newTask);

    const allTasks = await fetchTasks();
    setTasks(allTasks);
  };

  return (
    <Router>
      <div className="container">
        <Header
          onClick={() => setShowAddTask(!showAddTask)}
          open={showAddTask}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask addTask={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No tasks'
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
