// Components/CalendarView.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion';
import { FaTasks, FaCalendarCheck, FaExclamationTriangle } from 'react-icons/fa';
import { useTasks } from '../Context/TaskContext';

const CalendarView = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const { tasks } = useTasks();

  const handleChange = (value) => {
    setDate(value);
    if (onDateChange) onDateChange(value);
  };

  const getTasksForDate = (date) => {
    return tasks.filter(task => task.dueDate === date.toISOString().split('T')[0]);
  };

  const getTasksCountForDate = (date) => {
    return getTasksForDate(date).length;
  };

  const getCompletedTasksForDate = (date) => {
    return getTasksForDate(date).filter(task => task.completed).length;
  };

  const getOverdueTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => !task.completed && task.dueDate < today);
  };

  const getUpcomingTasks = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return tasks.filter(task => 
      !task.completed && 
      new Date(task.dueDate) > today &&
      new Date(task.dueDate) <= nextWeek
    ).slice(0, 5);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const taskCount = getTasksCountForDate(date);
      if (taskCount > 0) {
        const completedCount = getCompletedTasksForDate(date);
        const allCompleted = taskCount > 0 && completedCount === taskCount;
        
        return (
          <div className="flex justify-center mt-1">
            <div className={`w-2 h-2 rounded-full ${
              allCompleted ? 'bg-green-500' : 'bg-blue-500'
            }`} />
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    let className = '';
    if (view === 'month') {
      className += 'py-1 transition-all rounded-md ';
      
      const taskCount = getTasksCountForDate(date);
      if (taskCount > 0) {
        className += 'font-semibold ';
      }
      
      // Highlight today
      if (date.toDateString() === new Date().toDateString()) {
        className += 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 ';
      }
      
      // Highlight selected date
      if (date.toDateString() === new Date(date).toDateString()) {
        className += 'ring-2 ring-blue-400 ';
      }
    }
    return className;
  };

  const overdueTasks = getOverdueTasks();
  const upcomingTasks = getUpcomingTasks();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <FaCalendarCheck className="text-blue-600 dark:text-blue-400 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Calendar</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Track your tasks by due date</p>
        </div>
      </div>

      {/* Calendar */}
      <Calendar
        onChange={handleChange}
        value={date}
        className="rounded-xl border-none w-full mb-6"
        tileContent={tileContent}
        tileClassName={tileClassName}
        next2Label={null}
        prev2Label={null}
        minDetail="month"
      />

      {/* Selected Date Tasks */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <FaTasks className="text-blue-500" />
          Tasks on {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}:
        </h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {getTasksForDate(date).length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-2">
              No tasks due on this date
            </p>
          ) : (
            getTasksForDate(date).map(task => (
              <div 
                key={task.id} 
                className={`p-3 rounded-lg border-l-4 ${
                  task.completed 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-400' 
                    : 'bg-gray-50 dark:bg-gray-700 border-blue-400'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`font-medium text-sm ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
                    }`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {task.category} • {task.completed ? 'Completed' : 'Pending'}
                    </p>
                  </div>
                  {!task.completed && new Date(task.dueDate) < new Date() && (
                    <FaExclamationTriangle className="text-red-500 text-xs mt-1" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Overdue Tasks Alert */}
      {overdueTasks.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
            <FaExclamationTriangle className="text-sm" />
            <span className="text-sm font-medium">
              {overdueTasks.length} overdue task{overdueTasks.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}

      {/* Upcoming Tasks */}
      {upcomingTasks.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
            Upcoming this week:
          </h3>
          <div className="space-y-1">
            {upcomingTasks.map(task => (
              <div key={task.id} className="flex justify-between items-center text-xs p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="text-gray-700 dark:text-gray-300 truncate">{task.title}</span>
                <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CalendarView;