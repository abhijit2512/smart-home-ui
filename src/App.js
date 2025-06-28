import React, { useState, useEffect } from 'react';
import DeviceCard from './components/DeviceCard';
import TemperatureCard from './components/TemperatureCard';
import { FaLightbulb, FaFan } from 'react-icons/fa';
import Login from './components/Login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('authenticated') === 'true'
  );
  const [lightOn, setLightOn] = useState(false);
  const [fanOn, setFanOn] = useState(false);
  const [temperature, setTemperature] = useState(24);

  useEffect(() => {
    if (!isAuthenticated) return;

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
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('authenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authenticated');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <button
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          padding: '8px 16px',
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>

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
        <TemperatureCard
          temperature={temperature}
          setTemperature={setTemperature}
        />
      </div>
    </div>
  );
}

export default App;
