import { SensorData } from '../types/sensor';

export const transformSensorData = (data: SensorData[]) => {
  return data.reduce((acc, sensor) => {
    if (!acc[sensor.sensor_type]) {
      acc[sensor.sensor_type] = [];
    }
    acc[sensor.sensor_type].push(sensor);
    return acc;
  }, {} as Record<string, SensorData[]>);
};

export const getLatestSensorData = (data: SensorData[]) => {
  const grouped = transformSensorData(data);
  
  return Object.entries(grouped).reduce((acc, [type, sensors]) => {
    acc[type] = sensors.reduce((latest, current) => 
      current.time > latest.time ? current : latest
    );
    return acc;
  }, {} as Record<string, SensorData>);
};