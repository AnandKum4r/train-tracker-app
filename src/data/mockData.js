// Mock train data for Indian Railways
export const MOCK_TRAINS = {
  '12002': {
    trainNumber: '12002',
    trainName: 'Shatabdi Express',
    from: 'New Delhi (NDLS)',
    to: 'Bhopal Jn (BPL)',
    departureTime: '06:00',
    arrivalTime: '12:30',
    currentStatus: 'Running',
    delay: 0,
    currentStation: 'Gwalior Jn (GWL)',
    nextStation: 'Jhansi Jn (JHS)',
    distance: '456 km',
    coaches: ['CC', 'EC', 'PC'],
    route: [
      { station: 'New Delhi (NDLS)', arrivalTime: '--', departureTime: '06:00', platform: '16', status: 'Departed' },
      { station: 'Ghaziabad (GZB)', arrivalTime: '06:35', departureTime: '06:37', platform: '4', status: 'Departed' },
      { station: 'Aligarh Jn (ALJN)', arrivalTime: '07:28', departureTime: '07:30', platform: '2', status: 'Departed' },
      { station: 'Tundla Jn (TDL)', arrivalTime: '08:13', departureTime: '08:15', platform: '3', status: 'Departed' },
      { station: 'Agra Cantt (AGC)', arrivalTime: '08:45', departureTime: '08:47', platform: '1', status: 'Departed' },
      { station: 'Gwalior Jn (GWL)', arrivalTime: '10:03', departureTime: '10:05', platform: '2', status: 'Current' },
      { station: 'Jhansi Jn (JHS)', arrivalTime: '10:58', departureTime: '11:03', platform: '1', status: 'Upcoming' },
      { station: 'Bhopal Jn (BPL)', arrivalTime: '12:30', departureTime: '--', platform: '3', status: 'Upcoming' }
    ]
  },
  '12951': {
    trainNumber: '12951',
    trainName: 'Mumbai Rajdhani Express',
    from: 'New Delhi (NDLS)',
    to: 'Mumbai Central (MMCT)',
    departureTime: '16:30',
    arrivalTime: '08:35',
    currentStatus: 'Delayed',
    delay: 25,
    currentStation: 'Ratlam Jn (RTM)',
    nextStation: 'Dahod (DHD)',
    distance: '1384 km',
    coaches: ['1A', '2A', '3A'],
    route: [
      { station: 'New Delhi (NDLS)', arrivalTime: '--', departureTime: '16:30', platform: '1', status: 'Departed' },
      { station: 'Mathura Jn (MTJ)', arrivalTime: '18:03', departureTime: '18:05', platform: '5', status: 'Departed' },
      { station: 'Sawai Madhopur (SWM)', arrivalTime: '20:40', departureTime: '20:42', platform: '2', status: 'Departed' },
      { station: 'Kota Jn (KOTA)', arrivalTime: '21:30', departureTime: '21:40', platform: '1', status: 'Departed' },
      { station: 'Ratlam Jn (RTM)', arrivalTime: '01:25', departureTime: '01:35', platform: '4', status: 'Current' },
      { station: 'Dahod (DHD)', arrivalTime: '02:28', departureTime: '02:30', platform: '2', status: 'Upcoming' },
      { station: 'Vadodara Jn (BRC)', arrivalTime: '04:02', departureTime: '04:07', platform: '7', status: 'Upcoming' },
      { station: 'Mumbai Central (MMCT)', arrivalTime: '08:35', departureTime: '--', platform: '9', status: 'Upcoming' }
    ]
  },
  '12622': {
    trainNumber: '12622',
    trainName: 'Tamil Nadu Express',
    from: 'New Delhi (NDLS)',
    to: 'Chennai Central (MAS)',
    departureTime: '22:30',
    arrivalTime: '05:55',
    currentStatus: 'On Time',
    delay: 0,
    currentStation: 'Bhopal Jn (BPL)',
    nextStation: 'Itarsi Jn (ET)',
    distance: '2194 km',
    coaches: ['1A', '2A', '3A', 'SL'],
    route: [
      { station: 'New Delhi (NDLS)', arrivalTime: '--', departureTime: '22:30', platform: '3', status: 'Departed' },
      { station: 'Mathura Jn (MTJ)', arrivalTime: '00:03', departureTime: '00:05', platform: '4', status: 'Departed' },
      { station: 'Agra Cantt (AGC)', arrivalTime: '01:25', departureTime: '01:30', platform: '6', status: 'Departed' },
      { station: 'Jhansi Jn (JHS)', arrivalTime: '03:20', departureTime: '03:30', platform: '2', status: 'Departed' },
      { station: 'Bhopal Jn (BPL)', arrivalTime: '07:00', departureTime: '07:10', platform: '1', status: 'Current' },
      { station: 'Itarsi Jn (ET)', arrivalTime: '08:15', departureTime: '08:25', platform: '3', status: 'Upcoming' },
      { station: 'Nagpur (NGP)', arrivalTime: '13:15', departureTime: '13:25', platform: '2', status: 'Upcoming' },
      { station: 'Chennai Central (MAS)', arrivalTime: '05:55', departureTime: '--', platform: '9', status: 'Upcoming' }
    ]
  },
  '12801': {
    trainNumber: '12801',
    trainName: 'Purushottam Express',
    from: 'New Delhi (NDLS)',
    to: 'Puri (PURI)',
    departureTime: '14:50',
    arrivalTime: '11:45',
    currentStatus: 'Cancelled',
    delay: 0,
    currentStation: 'New Delhi (NDLS)',
    nextStation: '--',
    distance: '1665 km',
    coaches: ['1A', '2A', '3A', 'SL'],
    route: []
  }
};

export const POPULAR_TRAINS = [
  { number: '12002', name: 'Shatabdi Express', route: 'NDLS - BPL' },
  { number: '12951', name: 'Mumbai Rajdhani', route: 'NDLS - MMCT' },
  { number: '12622', name: 'Tamil Nadu Express', route: 'NDLS - MAS' },
  { number: '12801', name: 'Purushottam Express', route: 'NDLS - PURI' },
  { number: '12423', name: 'Dibrugarh Rajdhani', route: 'NDLS - DBRG' },
  { number: '12313', name: 'Sealdah Rajdhani', route: 'NDLS - SDAH' }
];

export const STATION_CODES = {
  'NDLS': 'New Delhi',
  'BPL': 'Bhopal Jn',
  'MMCT': 'Mumbai Central',
  'MAS': 'Chennai Central',
  'PURI': 'Puri',
  'GWL': 'Gwalior Jn',
  'JHS': 'Jhansi Jn',
  'RTM': 'Ratlam Jn',
  'KOTA': 'Kota Jn',
  'AGC': 'Agra Cantt',
  'GZB': 'Ghaziabad'
};

// Mock PNR data
export const MOCK_PNR_DATA = {
  '1234567890': {
    pnr: '1234567890',
    trainNumber: '12002',
    trainName: 'Shatabdi Express',
    dateOfJourney: '2024-08-15',
    from: 'New Delhi (NDLS)',
    to: 'Bhopal Jn (BPL)',
    passengers: [
      { name: 'RAHUL KUMAR', age: 28, gender: 'M', currentStatus: 'CNF/CC/12', bookingStatus: 'CNF/CC/12' },
      { name: 'PRIYA SHARMA', age: 25, gender: 'F', currentStatus: 'CNF/CC/13', bookingStatus: 'CNF/CC/13' }
    ],
    chartStatus: 'Chart Prepared',
    boardingPoint: 'New Delhi (NDLS)',
    reservationUpto: 'Bhopal Jn (BPL)',
    quota: 'GN',
    class: 'CC'
  }
};
