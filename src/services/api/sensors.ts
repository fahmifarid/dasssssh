import axios from 'axios';
import { API_BASE_URL, API_TOKENS } from './endpoints';
import { SensorData } from '../../types/sensor';

const fetchSensorByToken = async (token: string): Promise<SensorData[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${token}/telemetry`);
    const data = Array.isArray(response.data) ? response.data : [response.data];
    
    // Ensure we only return serializable data
    return data.map(item => ({
      time: item.time,
      sensor_identifier: item.sensor_identifier,
      sensor_type: item.sensor_type,
      ...Object.fromEntries(
        Object.entries(item).filter(([key]) => 
          !['time', 'sensor_identifier', 'sensor_type'].includes(key)
        )
      )
    }));
  } catch (error) {
    if (error instanceof Error) {
      return [{ 
        time: Date.now(),
        sensor_identifier: token,
        sensor_type: 'error',
        error: error.message 
      }] as SensorData[];
    }
    return [];
  }
};

export const fetchSensorData = async (): Promise<SensorData[]> => {
  try {
    const uniqueTokens = [...new Set(Object.values(API_TOKENS))];
    const sensorPromises = uniqueTokens.map(token => fetchSensorByToken(token));
    const results = await Promise.all(sensorPromises);
    return results.flat();
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    return [];
  }
};