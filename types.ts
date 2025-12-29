
export type FlightStatus = 'Active' | 'Scheduled' | 'Delayed' | 'Cancelled' | 'Boarding' | 'Departed' | 'Arrived' | 'Taxiing';

export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  aircraft: string;
  status: FlightStatus;
  origin: string;
  destination: string;
  gate: string;
  terminal: 'T1' | 'T2';
  scheduledDeparture: string;
  actualDeparture?: string;
  scheduledArrival: string;
  actualArrival?: string;
  passengers: {
    current: number;
    total: number;
  };
  baggageCarousel?: string;
}

export type GateStatus = 'Occupied' | 'Available' | 'Maintenance' | 'Delayed';

export interface Gate {
  id: string;
  status: GateStatus;
  currentFlightId?: string;
  area: string;
  terminal: 'T1' | 'T2';
  maintenanceUntil?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  status: 'Online' | 'Offline';
  avatar: string;
}

export interface ULD {
  id: string;
  type: string;
  description: string;
  available: number;
  total: number;
  status: 'Ready' | 'Low' | 'Occupied' | 'Maintenance';
}

export interface Activity {
  id: string;
  type: 'Status' | 'Gate' | 'Create' | 'ULD' | 'Note';
  flightId?: string;
  user: string;
  avatar: string;
  time: string;
  description: string;
  details?: string;
}
