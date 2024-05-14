import { useState,useEffect } from 'react';
import axios from 'axios';



const LoginSignup = () => {
    const [isLoggedIn,setLoggedIn]=useState(false);
    const [error, setError] = useState('');
    const [formType, setFormType] = useState('login');
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: '',
        userType: 'citizen'
    });
    const [signupFormData, setSignupFormData] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        userType: 'citizen'
    });

    const handleLoginFormChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData({ ...loginFormData, [name]: value });
    };

    const handleSignupFormChange = (e) => {
        const { name, value } = e.target;
        setSignupFormData({ ...signupFormData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formType === 'login') {
                const response = await axios.post('http://localhost:3000/signin', loginFormData);
                console.log(response.data.token);
                localStorage.setItem('token', response.data.token);
                setLoggedIn(true);
            } else {
                const response = await axios.post('http://localhost:3000/signup', signupFormData);
                setLoggedIn(true);
                setFormType('login');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data);
            } else {
                setError('An error occurred');
            }
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        // Redirect or show logged out state
    };
    
    useEffect(() => {
        async function verifyToken() {
            const token = localStorage.token; // Replace with your JWT token
            try {
                const response = await axios.get('http://localhost:3000/protected', {
                    headers: {
                        Authorization: token
                    }
                });
                console.log(response.data);
                setLoggedIn(true); // Token is valid
            } catch (error) {
                console.error(error.response.data); // Invalid token
            }
        }
        if(localStorage.token)
            {
              verifyToken();  
            }
        
    }, []);



    return (
        <div className="bg-green-200 min-h-screen flex justify-center items-center">
            <div className="bg-blue-200 p-8 rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">City Garbage Management System</h2>
                {isLoggedIn ? (
                 <div>

                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded focus:outline-none">Logout</button>
                    
                    </div>
                ) : (
                    <div>
                      {formType === 'login' && (
    <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input type="text" id="email" name="email" value={loginFormData.email} onChange={handleLoginFormChange} className="w-full px-3 py-2 border rounded focus:outline-none" required />
        </div>
        <div className="mb-4">
            <label htmlFor="password" className="block mb-1">Password</label>
            <input type="password" id="password" name="password" value={loginFormData.password} onChange={handleLoginFormChange} className="w-full px-3 py-2 border rounded focus:outline-none" required />
        </div>
        <div className="mb-4">
            <label htmlFor="userType" className="block mb-1">User Type</label>
            <select id="userType" name="userType" value={loginFormData.userType} onChange={handleLoginFormChange} className="w-full px-3 py-2 border rounded focus:outline-none">
                <option value="citizen">Citizen</option>
                <option value="admin">Admin</option>
                <option value="van">Van Driver</option>
            </select>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none">Login</button>
       
    </form>
)}

                      {formType === 'signup' && (
    <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input type="text" id="email" name="email" value={signupFormData.email} onChange={handleSignupFormChange} className="w-full px-3 py-2 border rounded focus:outline-none" required />
        </div>
        <div className="mb-4">
            <label htmlFor="password" className="block mb-1">Password</label>
            <input type="password" id="password" name="password" value={signupFormData.password} onChange={handleSignupFormChange} className="w-full px-3 py-2 border rounded focus:outline-none" required />
        </div>
        <div className="mb-4">
            <label htmlFor="repeatPassword" className="block mb-1">Repeat Password</label>
            <input type="password" id="repeatPassword" name="repeatPassword" value={signupFormData.repeatPassword} onChange={handleSignupFormChange} className="w-full px-3 py-2 border rounded focus:outline-none" required />
        </div>
        <div className="mb-4">
            <label htmlFor="userType" className="block mb-1">User Type</label>
            <select id="userType" name="userType" value={signupFormData.userType} onChange={handleSignupFormChange} className="w-full px-3 py-2 border rounded focus:outline-none">
                <option value="citizen">Citizen</option>
                <option value="admin">Admin</option>
                <option value="van">Van Driver</option>
            </select>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none">Signup</button>
       
    </form>
)}

                        <button type="button" onClick={() => setFormType(formType === 'login' ? 'signup' : 'login')} className="text-gray-500 hover:text-gray-700 ml-2">Switch to {formType === 'login' ? 'Signup' : 'Login'}</button>
                  <div><b className="text-red-500">{error}</b></div>  </div>
                    
                )}
            </div>
        </div>
    );
};

export default LoginSignup;

