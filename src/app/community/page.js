// pages/community/index.js
"use client";

import React, { useContext, useState } from 'react';
import { GlobalContext } from '@/context';
import axios from 'axios';

const CommunityPage = () => {
    const { user, messages, setMessages } = useContext(GlobalContext);
    const [newMessageContent, setNewMessageContent] = useState('');

    const handlePostSubmit = async () => {
        if (!newMessageContent) return;

        try {
            const response = await axios.post('/api/messages', { content: newMessageContent });
            setMessages([response.data.message, ...messages]);
            setNewMessageContent('');
        } catch (error) {
            console.error("Failed to submit message:", error);
        }
    };

    return (
        <div className="bg-gray-800 min-h-screen p-8">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Community Discussion</h1>
                {user && (
                    <div className="mb-6">
                        <textarea
                            value={newMessageContent}
                            onChange={(e) => setNewMessageContent(e.target.value)}
                            className="w-full border-gray-300 p-2 rounded-md"
                            rows="4"
                            placeholder="Share something with the community..."
                        />
                        <button
                            onClick={handlePostSubmit}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
                        >
                            Post
                        </button>
                    </div>
                )}
                <ul>
                    {messages.map((message) => (
                        <li key={message._id} className="mb-4 p-4 bg-gray-100 rounded-md">
                            <p className="text-gray-900">{message.content}</p>
                            <small className="text-gray-600">Posted by {message.user.name}</small>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CommunityPage;
