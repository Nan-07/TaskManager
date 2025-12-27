
import { useParams, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const task = {
    id,
    title: 'Submit Project Report',
    description: 'Finalize and upload the project report for review.',
    dueDate: '2025-04-25',
    category: 'Work',
    completed: false
  };

  const handleComplete = () => {
    toast.success('Task marked as complete!');

  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <button
        className="flex items-center gap-2 text-sm text-blue-500 hover:underline"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Back to Tasks
      </button>

      <h2 className="text-2xl font-bold">{task.title}</h2>

      <p className="text-gray-600 dark:text-gray-300">{task.description}</p>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        <strong>Due Date:</strong> {task.dueDate}
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400">
        <strong>Category:</strong> {task.category}
      </div>

      <div className="mt-4">
        <button
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          onClick={handleComplete}
        >
          <FaCheckCircle />
          Mark as Complete
        </button>
      </div>
    </motion.div>
  );
};

export default TaskDetails;