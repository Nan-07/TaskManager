// Components/QuickActions.jsx
import { motion } from 'framer-motion';
import { FaPlus, FaRocket, FaCalendarPlus, FaFilter, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const QuickActions = ({ onQuickAdd }) => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Quick Add Task',
      description: 'Add a task in 10 seconds',
      icon: <FaRocket className="text-white text-lg" />,
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
      action: () => onQuickAdd()
    },
    {
      title: 'Plan Week',
      description: 'Schedule tasks for next week',
      icon: <FaCalendarPlus className="text-white text-lg" />,
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      action: () => navigate('/task')
    },
    {
      title: 'Find Tasks',
      description: 'Search through your tasks',
      icon: <FaSearch className="text-white text-lg" />,
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
      action: () => navigate('/task')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
    >
      {actions.map((action, index) => (
        <motion.button
          key={action.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={action.action}
          className={`${action.bgColor} rounded-2xl p-4 text-left text-white shadow-lg transition-all duration-300 hover:shadow-xl`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-white/20 rounded-lg">
              {action.icon}
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
          <p className="text-white/80 text-sm">{action.description}</p>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default QuickActions;