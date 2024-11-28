import React from 'react';
import GaugeComponent from 'react-gauge-component';

interface WeatherGaugeProps {
  temperature: number;
  pressure: number;
  humidity: number;
}

const WeatherGauge: React.FC<WeatherGaugeProps> = ({
  temperature,
  pressure,
  humidity
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-navy-800 rounded-lg p-4">
        <h3 className="text-gray-400 text-sm mb-2">Temperature</h3>
        <GaugeComponent
          value={temperature}
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0.005,
            cornerRadius: 1,
            colorArray: ['#22c55e', '#eab308', '#ef4444']
          }}
          pointer={{
            type: 'needle',
            width: 5,
            color: '#ffffff'
          }}
          labels={{
            valueLabel: {
              formatTextValue: value => value.toFixed(1) + '°C',
              style: { fill: '#ffffff' }
            }
          }}
        />
      </div>

      <div className="bg-navy-800 rounded-lg p-4">
        <h3 className="text-gray-400 text-sm mb-2">Pressure</h3>
        <GaugeComponent
          value={pressure}
          maxValue={1000}
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0.005,
            cornerRadius: 1,
            colorArray: ['#3b82f6', '#6366f1', '#8b5cf6']
          }}
          pointer={{
            type: 'needle',
            width: 5,
            color: '#ffffff'
          }}
          labels={{
            valueLabel: {
              formatTextValue: value => value.toFixed(0) + ' hPa',
              style: { fill: '#ffffff' }
            }
          }}
        />
      </div>

      <div className="bg-navy-800 rounded-lg p-4">
        <h3 className="text-gray-400 text-sm mb-2">Humidity</h3>
        <GaugeComponent
          value={humidity}
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0.005,
            cornerRadius: 1,
            colorArray: ['#0ea5e9', '#0284c7', '#0369a1']
          }}
          pointer={{
            type: 'needle',
            width: 5,
            color: '#ffffff'
          }}
          labels={{
            valueLabel: {
              formatTextValue: value => value.toFixed(1) + '%',
              style: { fill: '#ffffff' }
            }
          }}
        />
      </div>
    </div>
  );
};

export default WeatherGauge;