// Pages/Task.jsx
import { useState } from 'react';
import TaskCard from '../Components/TaskCard.jsx';
import TaskModal from '../Components/TaskModal.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

const categories = ['All', 'Work', 'Personal', 'Urgent', 'Shopping'];

const Task = ({ 
  tasks, 
  pageTitle, 
  emptyMessage,
  onAddTask, 
  onUpdateTask, 
  onDeleteTask, 
  onToggleComplete,
  onToggleReminder,
  showFilters
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredTasks = categoryFilter === 'All' 
    ? tasks 
    : tasks.filter(task => task.category === categoryFilter);

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSave = (taskData) => {
    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
    } else {
      onAddTask(taskData);
    }
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleAddNew = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8 py-6 px-4" // Added py-6 and px-4 for overall spacing
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8"> {/* Increased mb-8 */}
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{pageTitle}</h2> {/* Increased text size */}
        <button
          onClick={handleAddNew}
          className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition transform hover:scale-105" // Increased padding and added hover effect
        >
          <FaPlus />
          Add Task
        </button>
      </div>

      {/* Category Filter */}
      {showFilters && (
        <div className="flex gap-3 flex-wrap mb-10"> {/* Increased mb-10 and gap-3 */}
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-5 py-2 rounded-full border-2 transition-all duration-200 ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                  : 'border-gray-300 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Task List */}
      <div className="mt-8 space-y-6"> {/* Added mt-8 and space-y-6 */}
        <AnimatePresence>
          {filteredTasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TaskCard
                task={task}
                onDelete={onDeleteTask}
                onEdit={handleEdit}
                onToggleComplete={onToggleComplete}
                onToggleReminder={onToggleReminder}
              />
            </motion.div>
          ))}
          {filteredTasks.length === 0 && (
            <motion.div
              className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700" // Increased py-20 and added styling
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">📝</div> {/* Added emoji and spacing */}
              <p className="text-gray-500 text-xl font-medium">{emptyMessage}</p> {/* Increased text size */}
              <p className="text-gray-400 mt-2">Get started by creating your first task!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSave}
        task={editingTask}
      />
    </motion.div>
  );
};

export default Task;