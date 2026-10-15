import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    axios.post('https://ecommerce121.pythonanywhere.com/api/login/', {
      username: username,
      password: password
    })
    .then(response => {
      // ലോഗിൻ വിജയിച്ചാൽ കിട്ടുന്ന ടോക്കൺ ബ്രൗസറിൽ സേവ് ചെയ്യുന്നു
      localStorage.setItem('token', response.data.token);
      alert("ലോഗിൻ വിജയകരം! 🔓");
      navigate('/admin-dashboard'); // ഡാഷ്‌ബോർഡിലേക്ക് പോകുന്നു
    })
    .catch(error => {
      console.error("Login failed:", error);
      alert("തെറ്റായ യൂസർനെയിം അല്ലെങ്കിൽ പാസ്‌വേഡ്.");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Admin Login</h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Username</label>
            <input 
              type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 outline-none"
              placeholder="Enter admin username"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input 
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 outline-none"
              placeholder="Enter password"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-95 transition-all">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;