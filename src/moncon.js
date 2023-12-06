
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});
console.log("sending");
export const saveTextToMongoDB = (text) => api.post('/save', { text });
