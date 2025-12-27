// Pages/Performance.jsx
import { useState } from 'react';
import { useTasks } from '../Context/TaskContext';
import { motion } from 'framer-motion';
import { FaClock, FaCheckCircle, FaTimesCircle, FaChartBar, FaCalendar, FaStar } from 'react-icons/fa';

const Performance = () => {
  const { tasks } = useTasks();
  const [timeRange, setTimeRange] = useState('week'); // week, month, year

  // Calculate real performance metrics from tasks
  const calculatePerformance = () => {
    const completedTasks = tasks.filter(task => task.completed);
    const pendingTasks = tasks.filter(task => !task.completed);
    const totalTasks = tasks.length;

    // Calculate completion rate
    const completionRate = totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0;

    // Calculate on-time rate (tasks completed before or on due date)
    const now = new Date();
    const onTimeTasks = completedTasks.filter(task => {
      if (!task.dueDate) return true;
      const dueDate = new Date(task.dueDate);
      return dueDate >= now || Math.abs((dueDate - now) / (1000 * 60 * 60 * 24)) <= 1;
    }).length;

    const onTimeRate = completedTasks.length > 0 ? (onTimeTasks / completedTasks.length) * 100 : 0;

    // Calculate delayed tasks
    const delayedTasks = completedTasks.length - onTimeTasks;

    // Calculate loyalty score (combination of completion rate and on-time rate)
    const loyaltyScore = Math.min(100, Math.round((completionRate + onTimeRate) / 2));

    return {
      completed: completedTasks.length,
      pending: pendingTasks.length,
      total: totalTasks,
      completionRate: Math.round(completionRate),
      onTimeRate: Math.round(onTimeRate),
      delayedTasks,
      loyaltyScore,
      onTimeTasks
    };
  };

  const performance = calculatePerformance();

  // Generate real weekly data from tasks
  const generateWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyData = days.map(day => ({ day, completed: 0, delayed: 0 }));

    tasks.forEach(task => {
      if (task.completed && task.dueDate) {
        const dueDate = new Date(task.dueDate);
        const completedDate = new Date(task.createdAt);
        const dayIndex = dueDate.getDay();
        const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Convert to Mon-Sun
        
        if (completedDate <= dueDate) {
          weeklyData[adjustedIndex].completed++;
        } else {
          weeklyData[adjustedIndex].delayed++;
        }
      }
    });

    return weeklyData;
  };

  const weeklyData = generateWeeklyData();
  const maxCompleted = Math.max(...weeklyData.map(d => d.completed + d.delayed), 1);

  // Monthly trend data
  const monthlyTrend = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 72 },
    { month: 'Mar', value: 78 },
    { month: 'Apr', value: 85 },
    { month: 'May', value: 82 },
    { month: 'Jun', value: 88 },
    { month: 'Jul', value: 92 },
    { month: 'Aug', value: 87 },
    { month: 'Sep', value: 90 },
    { month: 'Oct', value: 85 },
    { month: 'Nov', value: 88 },
    { month: 'Dec', value: 91 }
  ];

  const maxTrendValue = Math.max(...monthlyTrend.map(m => m.value));

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Performance Analytics</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Track your productivity and performance metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
            <FaCalendar className="text-gray-500" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent text-gray-800 dark:text-white focus:outline-none"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                {performance.completionRate}%
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {performance.completed}/{performance.total} tasks
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-blue-600 dark:text-blue-400 text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">On-Time Rate</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {performance.onTimeRate}%
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {performance.onTimeTasks} on time
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <FaClock className="text-green-600 dark:text-green-400 text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Delayed Tasks</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
                {performance.delayedTasks}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Need attention
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <FaTimesCircle className="text-red-600 dark:text-red-400 text-xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Loyalty Score</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                {performance.loyaltyScore}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Out of 100 points
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <FaStar className="text-purple-600 dark:text-purple-400 text-xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Weekly Performance</h2>
          <div className="flex items-end justify-between h-48 space-x-2 px-4">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex-1 flex flex-col items-center space-y-2">
                <div className="flex flex-col items-center space-y-1 w-full h-32 justify-end">
                  {/* Completed Tasks Bar */}
                  {day.completed > 0 && (
                    <div
                      className="w-3/4 bg-green-500 rounded-t transition-all duration-500 hover:bg-green-600 cursor-pointer"
                      style={{ height: `${(day.completed / maxCompleted) * 100}%` }}
                      title={`${day.completed} completed`}
                    />
                  )}
                  {/* Delayed Tasks Bar */}
                  {day.delayed > 0 && (
                    <div
                      className="w-3/4 bg-red-500 rounded-b transition-all duration-500 hover:bg-red-600 cursor-pointer"
                      style={{ height: `${(day.delayed / maxCompleted) * 100}%` }}
                      title={`${day.delayed} delayed`}
                    />
                  )}
                  {day.completed === 0 && day.delayed === 0 && (
                    <div className="w-3/4 bg-gray-200 dark:bg-gray-600 rounded h-2"></div>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{day.day}</p>
                  <p className="text-xs text-gray-500">
                    <span className="text-green-600">{day.completed}</span>/
                    <span className="text-red-600">{day.delayed}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-6 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-300">Completed on time</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-300">Delayed</span>
            </div>
          </div>
        </motion.div>

        {/* Monthly Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Monthly Trend</h2>
          <div className="flex items-end justify-between h-48 space-x-1 px-4">
            {monthlyTrend.map((month, index) => (
              <div key={month.month} className="flex-1 flex flex-col items-center">
                <div
                  className="w-3/4 bg-gradient-to-t from-blue-500 to-blue-600 rounded-t transition-all duration-500 hover:from-blue-600 hover:to-blue-700 cursor-pointer"
                  style={{ height: `${(month.value / maxTrendValue) * 100}%` }}
                  title={`${month.value}% in ${month.month}`}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{month.month}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">Performance trend over past year</p>
          </div>
        </motion.div>
      </div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Performance Insights</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600 dark:text-gray-300">Productivity Level</span>
                <span className={`font-bold ${
                  performance.completionRate >= 80 ? 'text-green-600' : 
                  performance.completionRate >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {performance.completionRate >= 80 ? 'Excellent' : 
                   performance.completionRate >= 60 ? 'Good' : 'Needs Improvement'}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    performance.completionRate >= 80 ? 'bg-green-500' : 
                    performance.completionRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${performance.completionRate}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600 dark:text-gray-300">Punctuality</span>
                <span className={`font-bold ${
                  performance.onTimeRate >= 90 ? 'text-green-600' : 
                  performance.onTimeRate >= 70 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {performance.onTimeRate >= 90 ? 'Always on time' : 
                   performance.onTimeRate >= 70 ? 'Usually on time' : 'Often delayed'}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    performance.onTimeRate >= 90 ? 'bg-green-500' : 
                    performance.onTimeRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${performance.onTimeRate}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600 dark:text-gray-300">Work Consistency</span>
                <span className={`font-bold ${
                  performance.loyaltyScore >= 85 ? 'text-green-600' : 
                  performance.loyaltyScore >= 70 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {performance.loyaltyScore >= 85 ? 'Very Consistent' : 
                   performance.loyaltyScore >= 70 ? 'Consistent' : 'Inconsistent'}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    performance.loyaltyScore >= 85 ? 'bg-green-500' : 
                    performance.loyaltyScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${performance.loyaltyScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Recommendations</h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            {performance.completionRate < 70 && (
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Focus on completing pending tasks to improve completion rate</span>
              </li>
            )}
            {performance.onTimeRate < 80 && (
              <li className="flex items-start space-x-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span>Set realistic deadlines and prioritize time-sensitive tasks</span>
              </li>
            )}
            {performance.delayedTasks > 3 && (
              <li className="flex items-start space-x-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>Review and adjust your task planning strategy</span>
              </li>
            )}
            <li className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Break large tasks into smaller, manageable steps</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Use reminders for important deadlines</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-500 mt-1">•</span>
              <span>Review your performance weekly to track improvements</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Performance;