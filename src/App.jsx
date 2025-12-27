// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout/Layout.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Task from './Pages/Task.jsx';
import TaskDetails from './Pages/TaskDetails.jsx';
import Login from './Pages/LogIn.jsx';
import Signup from './Pages/Signup.jsx';
import Profile from './Pages/Profile.jsx';
import Performance from './Pages/Performance.jsx';
import { TaskProvider, useTasks } from './Context/TaskContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// TaskWithFilter component
const TaskWithFilter = ({ filterType }) => {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskCompletion, toggleReminder } = useTasks();
  
  let filteredTasks = tasks;
  let pageTitle = "All Tasks";
  let emptyMessage = "No tasks available. Enjoy your day!";

  switch (filterType) {
    case 'completed':
      filteredTasks = tasks.filter(task => task.completed);
      pageTitle = "Completed Tasks";
      emptyMessage = "No completed tasks yet. Keep going!";
      break;
    case 'pending':
      filteredTasks = tasks.filter(task => !task.completed);
      pageTitle = "Pending Tasks";
      emptyMessage = "No pending tasks. Great job!";
      break;
    case 'todo':
      filteredTasks = tasks.filter(task => !task.completed);
      pageTitle = "To Do Tasks";
      emptyMessage = "No tasks to do. Time to relax!";
      break;
    default:
      filteredTasks = tasks;
      pageTitle = "All Tasks";
  }

  return (
    <Task 
      tasks={filteredTasks}
      pageTitle={pageTitle}
      emptyMessage={emptyMessage}
      onAddTask={addTask}
      onUpdateTask={updateTask}
      onDeleteTask={deleteTask}
      onToggleComplete={toggleTaskCompletion}
      onToggleReminder={toggleReminder}
      showFilters={filterType === 'all'}
    />
  );
};

const App = () => {
  return (
    <TaskProvider>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task" element={<TaskWithFilter filterType="all" />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/completed/:status" element={<TaskWithFilter filterType="completed" />} />
          <Route path="/to-do/:status" element={<TaskWithFilter filterType="pending" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/performance" element={<Performance />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </TaskProvider>
  );
};

export default App;