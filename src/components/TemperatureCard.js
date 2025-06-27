import React from 'react';
import { motion } from 'framer-motion';

const TemperatureCard = ({ temperature, setTemperature }) => {
  // Dynamically set slider color based on temperature
  let sliderColor = '#00BFFF'; // default (cool blue)
  if (temperature >= 28) {
    sliderColor = '#FF4500'; // hot (orange-red)
  } else if (temperature >= 24) {
    sliderColor = '#FFA500'; // warm (orange)
  } else {
    sliderColor = '#1E90FF'; // cool (blue)
  }

  return (
    <motion.div
      className="device-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>🌡️ Temperature</h2>
      <p>
        Current: <strong>{temperature}°C</strong>
      </p>

      {/* Slider for adjusting temperature */}
      <input
        type="range"
        min="16"
        max="32"
        value={temperature}
        onChange={(e) => {
          const newTemp = parseInt(e.target.value);
          setTemperature(newTemp);

          // Optional: Send updated temperature to backend
          fetch('http://localhost:5000/api/temperature', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ temperature: newTemp }),
          }).catch((err) =>
            console.error('Failed to update temperature:', err)
          );
        }}
        style={{
          width: '100%',
          accentColor: sliderColor,
          transition: 'accent-color 0.3s ease-in-out',
        }}
      />
    </motion.div>
  );
};

export default TemperatureCard;
