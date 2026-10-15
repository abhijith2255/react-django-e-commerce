import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from './CartContext';

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  // ആകെ തുക കണ്ടുപിടിക്കാൻ
  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // പേജ് റീലോഡ് ആകാതിരിക്കാൻ

    // ഡാറ്റാബേസിലേക്ക് അയക്കേണ്ട വിവരങ്ങൾ
    const orderData = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      total_amount: totalPrice
    };

    // Django API-ലേക്ക് ഓർഡർ അയക്കുന്നു
    axios.post('https://ecommerce121.pythonanywhere.com/api/orders/', orderData)
      .then(response => {
        alert("🎉 നിങ്ങളുടെ ഓർഡർ വിജയകരമായി പ്ലേസ് ചെയ്തിരിക്കുന്നു!");
        clearCart(); // കാർട്ട് കാലിയാക്കുന്നു
        navigate('/'); // ഹോം പേജിലേക്ക് തിരിച്ചുപോകുന്നു
      })
      .catch(error => {
        console.error("Error placing order:", error);
        alert("ക്ഷമിക്കണം, ഓർഡർ നൽകുന്നതിൽ തടസ്സമുണ്ടായി.");
      });
  };

  // കാർട്ടിൽ സാധനങ്ങളില്ലെങ്കിൽ
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty!</h2>
          <Link to="/" className="text-blue-600 hover:underline">Go back to store</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 border-b pb-4">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Full Name</label>
            <input 
              type="text" 
              name="name" 
              required 
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
            <input 
              type="text" 
              name="phone" 
              required 
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Delivery Address</label>
            <textarea 
              name="address" 
              required 
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="Enter your full address"
            ></textarea>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl flex justify-between items-center mt-8">
            <span className="text-gray-700 font-bold">Total Amount to Pay (COD):</span>
            <span className="text-2xl font-black text-blue-700">₹{totalPrice.toFixed(2)}</span>
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 active:scale-95 transition-all shadow-lg mt-6">
            Place Order (Cash on Delivery)
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;