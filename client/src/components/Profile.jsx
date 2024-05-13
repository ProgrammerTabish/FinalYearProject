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
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <p>Email: user@example.com</p>
            <p>User Type: Citizen</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="password" className="block mb-1">New Password</label>
                <input type="password" id="password" value={password} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none" required />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none mt-4">Update Password</button>
            </form>
            {message && <p className="mt-2 text-green-500">{message}</p>}
        </div>
    );
};

export default Profile;
