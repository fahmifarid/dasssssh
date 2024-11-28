import { useQuery } from '@tanstack/react-query';
import { fetchSensorData } from '../services/api/sensors';
import { SensorData } from '../types/sensor';

export const useSensorData = () => {
  return useQuery<SensorData[], Error>({
    queryKey: ['sensorData'],
    queryFn: fetchSensorData,
    refetchInterval: 30000,
    retry: 3,
    staleTime: 10000,
    suspense: false,
    useErrorBoundary: false
  });
};

export const useTypedSensorData = <T extends SensorData>(sensorType: string) => {
  const { data, ...rest } = useSensorData();
  const typedData = data?.find(sensor => 
    sensor.sensor_type === sensorType && !('error' in sensor)
  ) as T | undefined;
  return { data: typedData, ...rest };
};