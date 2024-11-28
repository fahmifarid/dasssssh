import React from 'react';
import { Activity, AlertTriangle, Users, Gauge } from 'lucide-react';
import SensorCard from '../components/Dashboard/SensorCard';
import ChartCard from '../components/Dashboard/ChartCard';
import LoadingSpinner from '../components/Dashboard/LoadingSpinner';
import ErrorBoundary from '../components/Dashboard/ErrorBoundary';
import { useTypedSensorData } from '../hooks/useSensorData';
import { 
  StepAlignmentSensor, 
  ChainSensor, 
  PassengerSensor, 
  OperationalSensor 
} from '../types/sensor';
import { formatNumber, formatPercentage } from '../utils/formatters';

const Dashboard: React.FC = () => {
  const { data: stepData, isLoading: isStepLoading } = useTypedSensorData<StepAlignmentSensor>('step_alignment');
  const { data: chainData, isLoading: isChainLoading } = useTypedSensorData<ChainSensor>('chain_and_lubrication');
  const { data: passengerData, isLoading: isPassengerLoading } = useTypedSensorData<PassengerSensor>('passenger_and_safety');
  const { data: operationalData, isLoading: isOperationalLoading } = useTypedSensorData<OperationalSensor>('operational_metrics');

  if (isStepLoading || isChainLoading || isPassengerLoading || isOperationalLoading) {
    return <LoadingSpinner />;
  }

  if (!stepData || !chainData || !passengerData || !operationalData) {
    return (
      <div className="text-center text-red-500 p-4">
        Error loading sensor data
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SensorCard
            title="Step Alignment"
            value={formatPercentage(stepData.step_alignment_percentage)}
            unit=""
            trend="up"
            trendValue="+0.2%"
            icon={<Activity className="w-6 h-6" />}
            color="border-l-4 border-green-500"
          />
          <SensorCard
            title="Chain Speed"
            value={formatNumber(chainData.chain_speed_ms)}
            unit="m/s"
            trend="down"
            trendValue="-0.02 m/s"
            icon={<Gauge className="w-6 h-6" />}
            color="border-l-4 border-blue-500"
          />
          <SensorCard
            title="Passengers Today"
            value={passengerData.passengers_today}
            unit=""
            trend="up"
            trendValue="+245"
            icon={<Users className="w-6 h-6" />}
            color="border-l-4 border-yellow-500"
          />
          <SensorCard
            title="Energy Usage"
            value={formatNumber(operationalData.energy_used_today_kwh)}
            unit="kWh"
            trend="up"
            trendValue="+2.5 kWh"
            icon={<Gauge className="w-6 h-6" />}
            color="border-l-4 border-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard
            title="Chain Performance Metrics"
            data={{
              labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
              datasets: [
                {
                  label: 'Chain Speed',
                  data: [0.48, 0.5, 0.52, 0.49, 0.51, 0.5],
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.4
                },
                {
                  label: 'Chain Tension',
                  data: [92, 94, 95, 93, 95, 94],
                  borderColor: 'rgb(255, 99, 132)',
                  tension: 0.4
                }
              ]
            }}
          />
          <ChartCard
            title="Passenger Flow Analysis"
            data={{
              labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
              datasets: [
                {
                  label: 'Passenger Flow',
                  data: [120, 450, 850, 400, 750, 300],
                  borderColor: 'rgb(99, 102, 241)',
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                  fill: true,
                  tension: 0.4
                }
              ]
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-navy-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-4">System Alerts</h3>
            <div className="space-y-2">
              {[
                { text: 'Chain tension warning', type: 'warning' },
                { text: 'Lubrication level low', type: 'warning' },
                { text: 'Step alignment optimal', type: 'success' }
              ].map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-2 rounded ${
                    alert.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500' :
                    alert.type === 'success' ? 'bg-green-500/10 text-green-500' :
                    'bg-red-500/10 text-red-500'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">{alert.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;