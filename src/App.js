import React, { useState, useEffect } from 'react';
import DeviceCard from './components/DeviceCard';
import TemperatureCard from './components/TemperatureCard';
import { FaLightbulb, FaFan } from 'react-icons/fa';
import './App.css';

function App() {
  const [lightOn, setLightOn] = useState(false);
  const [fanOn, setFanOn] = useState(false);
  const [temperature, setTemperature] = useState(24);

  useEffect(() => {
    const fetchState = () => {
      fetch('http://localhost:5000/api/state')
        .then(res => res.json())
        .then(data => {
          setLightOn(data.lightOn);
          setFanOn(data.fanOn);
          setTemperature(data.temperature);
        })
        .catch(err => console.error("Error fetching state:", err));
    };

    fetchState(); // initial fetch
    const interval = setInterval(fetchState, 5000); // repeat every 5s

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="app">
      <h1>🏠 Animated Smart Home</h1>
      <div className="device-grid">
        <DeviceCard
  icon={<FaLightbulb />}
  label="Light"
  status={lightOn}
  onToggle={() => setLightOn(!lightOn)}
  className={lightOn ? 'glow' : ''}
/>

      <DeviceCard
  icon={<FaFan className={fanOn ? 'spin' : ''} />}
  label="Fan"
  status={fanOn}
  onToggle={() => setFanOn(!fanOn)}
  className={fanOn ? 'glow' : ''}
/>


        {/* 👇 TemperatureCard with slider added here */}
        <TemperatureCard
          temperature={temperature}
          setTemperature={setTemperature}
        />
      </div>
    </div>
  );
}

export default App;
