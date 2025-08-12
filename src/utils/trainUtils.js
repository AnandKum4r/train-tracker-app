// Utility functions for train tracking

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'running':
    case 'on time':
      return 'text-railway-green';
    case 'delayed':
      return 'text-railway-red';
    case 'cancelled':
      return 'text-gray-500';
    default:
      return 'text-gray-600';
  }
};

export const getStatusBadgeClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'running':
    case 'on time':
      return 'status-ontime';
    case 'delayed':
      return 'status-delayed';
    case 'cancelled':
      return 'status-cancelled';
    default:
      return 'bg-gray-500 text-white';
  }
};

export const formatTime = (time) => {
  if (!time || time === '--') return '--';
  return time;
};

export const formatDelay = (delay) => {
  if (!delay || delay === 0) return 'On Time';
  return `Delayed by ${delay} min`;
};

export const getCurrentTime = () => {
  return new Date().toLocaleTimeString('en-IN', { 
    hour12: true, 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const getCurrentDate = () => {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const validateTrainNumber = (trainNumber) => {
  const trainRegex = /^[0-9]{4,5}$/;
  return trainRegex.test(trainNumber.trim());
};

export const validatePNR = (pnr) => {
  const pnrRegex = /^[0-9]{10}$/;
  return pnrRegex.test(pnr.trim());
};

export const getTrainProgress = (route, currentStation) => {
  if (!route || !currentStation) return 0;
  
  const currentIndex = route.findIndex(station => 
    station.station.includes(currentStation) || 
    station.status === 'Current'
  );
  
  if (currentIndex === -1) return 0;
  
  return Math.round((currentIndex / (route.length - 1)) * 100);
};

export const getNextStations = (route, currentStation, count = 3) => {
  if (!route || !currentStation) return [];
  
  const currentIndex = route.findIndex(station => 
    station.station.includes(currentStation) || 
    station.status === 'Current'
  );
  
  if (currentIndex === -1) return route.slice(0, count);
  
  return route.slice(currentIndex + 1, currentIndex + 1 + count);
};
