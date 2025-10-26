// Context/TaskContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Sample tasks data
  const sampleTasks = [
    {
      id: 1,
      title: 'Team Meeting',
      description: 'Discuss roadmap with design team.',
      dueDate: '2024-12-25',
      category: 'Work',
      priority: 'medium',
      completed: false,
      reminderEnabled: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Doctor Appointment',
      description: 'General checkup at 4:30 PM.',
      dueDate: '2024-12-24',
      category: 'Personal',
      priority: 'high',
      completed: false,
      reminderEnabled: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Submit Assignment',
      description: 'AI/ML project report submission.',
      dueDate: '2024-12-22',
      category: 'Urgent',
      priority: 'high',
      completed: true,
      reminderEnabled: false,
      createdAt: new Date().toISOString()
    }
  ];

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks && JSON.parse(savedTasks).length > 0) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(sampleTasks);
      localStorage.setItem('tasks', JSON.stringify(sampleTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // ✅ FIXED: addTask function
  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now(), // Unique ID
      completed: false,
      reminderEnabled: taskData.reminderEnabled !== undefined ? taskData.reminderEnabled : true,
      createdAt: new Date().toISOString()
    };
    
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  // ✅ FIXED: updateTask function
  const updateTask = (taskId, updatedData) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updatedData } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleReminder = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, reminderEnabled: !task.reminderEnabled } : task
    ));
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    toggleReminder
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};