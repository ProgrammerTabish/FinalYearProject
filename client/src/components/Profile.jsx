import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/profile', { password });
            setMessage('Password updated successfully');
        } catch (err) {
            console.error(err);
            setMessage('Failed to update password');
        }
    };

    return (
        <div className="container mx-auto mt-10 bg-green-200 p-6 rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <p className="mb-2"><strong>Email:</strong> user@example.com</p>
            <p className="mb-4"><strong>User Type:</strong> Citizen</p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <label htmlFor="password" className="text-lg">New Password</label>
                <input type="password" id="password" value={password} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" required />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-green-600 transition-colors">Update Password</button>
            </form>
            {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
    );
};

export default Profile;
