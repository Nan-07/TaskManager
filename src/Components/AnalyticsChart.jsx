// Components/AnalyticsChart.jsx
import { motion } from 'framer-motion';
import { FaChartBar, FaCalendarCheck, FaClock, FaCheckCircle } from 'react-icons/fa';

const AnalyticsChart = ({ tasks }) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const overdueTasks = tasks.filter(task => !task.completed && new Date(task.dueDate) < new Date()).length;
  
  // Category distribution
  const categoryData = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {});

  // Weekly completion trend
  const weeklyTrend = [65, 78, 82, 75, 90, 85, 88]; // Sample data

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Completion Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <FaChartBar className="text-blue-600 dark:text-blue-400 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Completion Analytics</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your task completion insights</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
            <span className="font-semibold text-green-600">{completedTasks} tasks</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedTasks / tasks.length) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Pending</span>
            <span className="font-semibold text-yellow-600">{pendingTasks} tasks</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(pendingTasks / tasks.length) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Overdue</span>
            <span className="font-semibold text-red-600">{overdueTasks} tasks</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(overdueTasks / tasks.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </motion.div>

      {/* Category Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <FaCalendarCheck className="text-purple-600 dark:text-purple-400 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Category Distribution</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tasks by category</p>
          </div>
        </div>

        <div className="space-y-3">
          {Object.entries(categoryData).map(([category, count], index) => (
            <div key={category} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  category === 'Work' ? 'bg-blue-500' :
                  category === 'Personal' ? 'bg-green-500' :
                  category === 'Urgent' ? 'bg-red-500' :
                  'bg-purple-500'
                }`}></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{count}</span>
                <span className="text-xs text-gray-500">
                  ({Math.round((count / tasks.length) * 100)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsChart;