// api.js
import axiosInstance from './axiosConfig';


export const createRoom = () => {
  return axiosInstance.post('/rooms/', {});
};


export const joinRoom = (roomId) => {
  return axiosInstance.get(`/rooms/${roomId}/`);
};
