import React from 'react';
import { motion } from 'framer-motion';

const DeviceCard = ({ icon, label, status, onToggle, className }) => {
  return (
    <motion.div
      className={`device-card ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        style={{
          fontSize: '2rem',
          color: status ? '#FFD700' : '#444', // glowing yellow if ON
          textShadow: status
            ? '0 0 10px #FFD700, 0 0 20px #FFD700'
            : 'none',
        }}
      >
        {icon}
      </div>
      <h3>{label}</h3>
      <p>Status: <strong>{status ? 'ON' : 'OFF'}</strong></p>
      <button onClick={onToggle}>
        Turn {status ? 'OFF' : 'ON'}
      </button>
    </motion.div>
  );
};

export default DeviceCard;
