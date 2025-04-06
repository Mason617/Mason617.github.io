import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getMessages = async () => {
    try {
        const response = await axios.get(`${API_URL}/hello`);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const saveMessage = async (content) => {
    try {
        const response = await axios.post(`${API_URL}/hello`, { content });
        return response.data;
    } catch (error) {
        console.error('Error saving message:', error);
        throw error;
    }
};