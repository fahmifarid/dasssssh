import axios from 'axios';
import { SensorData } from '../types/sensor';

const API_BASE_URL = 'http://ec2-34-228-14-84.compute-1.amazonaws.com:8080/api/v1';

const API_TOKENS = {
  stepAlignment: 'BDVobOEZAslxFfM91kyT',
  emergencyStop: 'psvse1aDJ2ms6NC1lXg5',
  chain: 'BDVobOEZAslxFfM91kyT',
  passenger: 'UNO9asbB5xZecpYNqIMy',
  gap: 'OoIohOxSewdkhcHT2hCC',
  operational: 'cBNmjzep8rIcc3meEPHL',
  maintenance: 'ARRw8VdrskHMtTcYsW9Q'
};

export const fetchSensorData = async (): Promise<SensorData[]> => {
  try {
    const responses = await Promise.all(
      Object.entries(API_TOKENS).map(([sensorType, token]) =>
        axios.get(`${API_BASE_URL}/${token}/telemetry`)
      )
    );

    return responses.flatMap(response => response.data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch sensor data: ${error.message}`);
    }
    throw new Error('An unknown error occurred while fetching sensor data');
  }
};