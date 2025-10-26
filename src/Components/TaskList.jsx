
import React from 'react';
import TaskCard from './TaskCard';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';

const TaskList = ({ tasks, onDelete, onEdit }) => {
  return (
    <div className="mt-4">
      {tasks && tasks.length > 0 ? (
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 dark:text-gray-400 py-6"
        >
          No tasks available. Enjoy your day!
        </motion.div>
      )}
    </div>
  );
};

export default TaskList;