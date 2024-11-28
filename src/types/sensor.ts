export interface BaseSensorData {
  time: number;
  sensor_identifier: string;
  sensor_type: string;
}

export interface ErrorSensorData extends BaseSensorData {
  error: string;
}

export interface StepAlignmentSensor extends BaseSensorData {
  step_alignment_percentage: number;
  misalignments_today: number;
  cycle_count_step23: number;
  estimated_lifespan_remaining_percentage: number;
}

export interface EmergencyStopSensor extends BaseSensorData {
  emergency_stop_active: number;
  handrail_entry_clear: number;
  comb_plate_normal: number;
}

export interface ChainSensor extends BaseSensorData {
  chain_speed_ms: number;
  chain_tension_percentage: number;
  system_status_normal: number;
  lubrication_level_percentage: number;
}

export interface PassengerSensor extends BaseSensorData {
  passengers_today: number;
  current_flow_rate_ppm: number;
  object_alerts_today: number;
  light_curtain_active: number;
}

export interface GapSensor extends BaseSensorData {
  left_gap_mm: number;
  right_gap_mm: number;
  out_of_spec_alerts_this_week: number;
}

export interface OperationalSensor extends BaseSensorData {
  status_running: number;
  direction_up: number;
  hours_operated_today: number;
  energy_used_today_kwh: number;
}

export interface MaintenanceSensor extends BaseSensorData {
  days_until_next_maintenance: number;
}

export type SensorData = 
  | StepAlignmentSensor 
  | EmergencyStopSensor 
  | ChainSensor 
  | PassengerSensor 
  | GapSensor 
  | OperationalSensor 
  | MaintenanceSensor
  | ErrorSensorData;