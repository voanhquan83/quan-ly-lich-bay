
import { Flight, Gate, Staff, ULD, Activity } from './types';

export const FLIGHTS: Flight[] = [
  // --- DEPARTURES FROM SGN (Chuyến đi) ---
  {
    id: 'VN 242',
    airline: 'Vietnam Airlines',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Vietnam_Airlines_logo.svg/1200px-Vietnam_Airlines_logo.svg.png',
    aircraft: 'Airbus A350',
    status: 'Boarding',
    origin: 'SGN',
    destination: 'HAN',
    gate: '15',
    terminal: 'T1',
    scheduledDeparture: '16:30',
    scheduledArrival: '18:40',
    passengers: { current: 280, total: 305 }
  },
  {
    id: 'VJ 175',
    airline: 'Vietjet Air',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/VietJet_Air_logo.svg/1200px-VietJet_Air_logo.svg.png',
    aircraft: 'A321 Neo',
    status: 'Delayed',
    origin: 'SGN',
    destination: 'DAD',
    gate: '08',
    terminal: 'T1',
    scheduledDeparture: '17:00',
    actualDeparture: '17:45',
    scheduledArrival: '18:20',
    passengers: { current: 190, total: 230 }
  },
  {
    id: 'QH 201',
    airline: 'Bamboo Airways',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Bamboo_Airways_logo.svg/1024px-Bamboo_Airways_logo.svg.png',
    aircraft: 'B787-9',
    status: 'Scheduled',
    origin: 'SGN',
    destination: 'HPH',
    gate: '04',
    terminal: 'T1',
    scheduledDeparture: '18:15',
    scheduledArrival: '20:15',
    passengers: { current: 0, total: 290 }
  },
  {
    id: 'CX 766',
    airline: 'Cathay Pacific',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Cathay_Pacific_logo.svg/1200px-Cathay_Pacific_logo.svg.png',
    aircraft: 'A330-300',
    status: 'Taxiing',
    origin: 'SGN',
    destination: 'HKG',
    gate: '22',
    terminal: 'T2',
    scheduledDeparture: '19:15',
    scheduledArrival: '22:50',
    passengers: { current: 245, total: 260 }
  },
  {
    id: 'VN 123',
    airline: 'Vietnam Airlines',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Vietnam_Airlines_logo.svg/1200px-Vietnam_Airlines_logo.svg.png',
    aircraft: 'B787-9',
    status: 'Taxiing',
    origin: 'SGN',
    destination: 'HAN',
    gate: '04',
    terminal: 'T2',
    scheduledDeparture: '14:30',
    scheduledArrival: '16:15',
    passengers: { current: 210, total: 250 }
  },

  // --- ARRIVALS TO SGN (Chuyến đến) ---
  {
    id: 'VN 256',
    airline: 'Vietnam Airlines',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Vietnam_Airlines_logo.svg/1200px-Vietnam_Airlines_logo.svg.png',
    aircraft: 'Airbus A321',
    status: 'Active',
    origin: 'HAN',
    destination: 'SGN',
    gate: '12',
    terminal: 'T1',
    scheduledDeparture: '14:00',
    actualDeparture: '14:05',
    scheduledArrival: '16:05',
    actualArrival: '16:10',
    passengers: { current: 156, total: 180 },
    baggageCarousel: '04'
  },
  {
    id: 'QR 970',
    airline: 'Qatar Airways',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Qatar_Airways_logo.svg/1200px-Qatar_Airways_logo.svg.png',
    aircraft: 'B777-300ER',
    status: 'Active',
    origin: 'DOH',
    destination: 'SGN',
    gate: '28',
    terminal: 'T2',
    scheduledDeparture: '02:15',
    scheduledArrival: '13:55',
    actualArrival: '14:10',
    passengers: { current: 312, total: 350 },
    baggageCarousel: '08'
  },
  {
    id: 'VJ 321',
    airline: 'Vietjet Air',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/VietJet_Air_logo.svg/1200px-VietJet_Air_logo.svg.png',
    aircraft: 'A321',
    status: 'Arrived',
    origin: 'CXR',
    destination: 'SGN',
    gate: 'G5',
    terminal: 'T1',
    scheduledDeparture: '15:20',
    scheduledArrival: '16:20',
    actualArrival: '16:15',
    passengers: { current: 215, total: 230 },
    baggageCarousel: '02'
  },
  {
    id: 'KE 685',
    airline: 'Korean Air',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Korean_Air_logo.svg/1280px-Korean_Air_logo.svg.png',
    aircraft: 'B747-8I',
    status: 'Active',
    origin: 'ICN',
    destination: 'SGN',
    gate: '24',
    terminal: 'T2',
    scheduledDeparture: '18:40',
    scheduledArrival: '22:10',
    passengers: { current: 340, total: 368 },
    baggageCarousel: '09'
  }
];

export const GATES: Gate[] = [
  { id: 'G-01', status: 'Occupied', currentFlightId: 'VN 242', area: 'Khu vực A - Sảnh đi', terminal: 'T1' },
  { id: 'G-02', status: 'Available', area: 'Khu vực A - Sảnh đi', terminal: 'T1' },
  { id: 'G-03', status: 'Delayed', currentFlightId: 'VJ 175', area: 'Khu vực A - Sảnh đi', terminal: 'T1' },
  { id: 'G-04', status: 'Maintenance', area: 'Khu vực A - Sảnh đi', terminal: 'T1', maintenanceUntil: '18:00' },
  { id: 'G-05', status: 'Occupied', currentFlightId: 'VJ 321', area: 'Khu vực A - Sảnh đi', terminal: 'T1' },
  { id: 'G-06', status: 'Available', area: 'Khu vực A - Sảnh đi', terminal: 'T1' }
];

export const STAFF_LIST: Staff[] = [
  { id: '1001', name: 'Nguyễn Minh Tuấn', role: 'Quản trị viên', email: 'minhtuan@airport.vn', status: 'Online', avatar: 'https://i.pravatar.cc/150?u=1001' },
  { id: '1024', name: 'Trần Thu Hà', role: 'Điều phối bay', email: 'thuha.tran@airport.vn', status: 'Online', avatar: 'https://i.pravatar.cc/150?u=1024' },
  { id: '2055', name: 'Lê Văn Sơn', role: 'Quản lý cổng', email: 'vanson@airport.vn', status: 'Offline', avatar: 'https://i.pravatar.cc/150?u=2055' }
];

export const ULDS: ULD[] = [
  { id: 'AKE', type: 'Container', description: 'LD3 Standard Container', available: 150, total: 200, status: 'Ready' },
  { id: 'PAG', type: 'Pallet', description: 'LD7 Pallet with Net', available: 12, total: 80, status: 'Low' },
  { id: 'PMC', type: 'Pallet', description: 'Main Deck Pallet', available: 45, total: 100, status: 'Occupied' },
  { id: 'RAP', type: 'Cooltainer', description: 'Refrigerated Container', available: 2, total: 10, status: 'Maintenance' }
];

export const ACTIVITIES: Activity[] = [
  { id: '1', type: 'Status', flightId: 'VN 242', user: 'Nguyễn Văn A', avatar: 'https://i.pravatar.cc/150?u=a', time: '10:45', description: 'Cập nhật trạng thái VN 242', details: 'Trạng thái: Scheduled ➔ Boarding' },
  { id: '2', type: 'Create', flightId: 'VN 1234', user: 'Trần Thị B', avatar: 'https://i.pravatar.cc/150?u=b', time: '09:30', description: 'Tạo chuyến bay mới VN 1234', details: 'Hành trình: HAN ➔ SGN • 14:00' },
  { id: '3', type: 'Gate', flightId: 'VJ 175', user: 'Lê Văn C', avatar: 'https://i.pravatar.cc/150?u=c', time: '08:15', description: 'Thay đổi cửa ra VJ 175', details: 'Cửa: 10 ➔ 08' }
];
