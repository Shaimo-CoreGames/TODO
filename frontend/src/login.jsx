import { useState } from 'react';
import axios from 'axios';

export default function Login({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        try {
            const response = await axios.post("http://127.0.0.1:8000/login", formData);
            const token = response.data.access_token;
            localStorage.setItem("token", token); // Save for later
            setToken(token); // Update App state
        } catch (err) {
            alert("Login failed!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
            <form onSubmit={handleLogin} className="p-8 bg-white shadow-xl rounded-2xl w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <input
                    type="text" placeholder="Username"
                    className="w-full p-2 border mb-3 rounded"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password" placeholder="Password"
                    className="w-full p-2 border mb-4 rounded"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Sign In
                </button>
            </form>
        </div>
    );
}