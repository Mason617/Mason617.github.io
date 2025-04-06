import React, { useState, useEffect } from 'react';
import { getMessages, saveMessage } from '../services/apiService';

const MessageComponent = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const data = await getMessages();
            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages', error);
        }
    };

    const handleSaveMessage = async () => {
        try {
            await saveMessage(newMessage);
            fetchMessages();
            setNewMessage('');
        } catch (error) {
            console.error('Failed to save message', error);
        }
    };

    return (
        <div>
            <h1>Messages</h1>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>{message.content}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Enter new message"
            />
            <button onClick={handleSaveMessage}>Save Message</button>
        </div>
    );
};

export default MessageComponent;