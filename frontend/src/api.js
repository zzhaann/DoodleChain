
import axiosInstance from './axiosInstance';


export const createRoom = (roomData) => {
  return axiosInstance.post('/rooms/', roomData);
};


export const joinRoom = (roomId) => {
  return axiosInstance.get(`/rooms/${roomId}/`);
};
