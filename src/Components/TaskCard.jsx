// Components/TaskCard.jsx
import { motion } from 'framer-motion';
import { FaTrashAlt, FaEdit, FaRegClock, FaCheckCircle, FaRegCircle, FaBell, FaBellSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task, onDelete, onEdit, onToggleComplete, onToggleReminder }) => {
  const navigate = useNavigate();

  const handleReminderToggle = (e) => {
    e.stopPropagation();
    if (onToggleReminder) {
      onToggleReminder(task.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      layout
      className={`bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 flex justify-between items-start gap-4 transition-all ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-3 flex-1">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="mt-1 text-gray-400 hover:text-green-500 transition"
        >
          {task.completed ? (
            <FaCheckCircle className="text-green-500" />
          ) : (
            <FaRegCircle />
          )}
        </button>
        
        <div 
          className="flex-1 cursor-pointer" 
          onClick={() => navigate(`/task/${task.id}`)}
        >
          <h3 className={`text-lg font-semibold ${
            task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
          }`}>
            {task.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
          <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <FaRegClock /> <span>{task.dueDate}</span>
          </div>
          <div className="mt-2 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full inline-block">
            {task.category}
          </div>
          {task.completed && (
            <div className="mt-1 text-xs text-green-600 font-medium">Completed</div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-300">
        {/* Reminder Toggle */}
        <button 
          onClick={handleReminderToggle}
          className={`hover:text-yellow-500 ${task.reminderEnabled ? 'text-yellow-500' : ''}`}
        >
          {task.reminderEnabled ? <FaBell /> : <FaBellSlash />}
        </button>
        
        <button onClick={() => onEdit(task)} className="hover:text-blue-500">
          <FaEdit />
        </button>
        <button onClick={() => onDelete(task.id)} className="hover:text-red-500">
          <FaTrashAlt />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;