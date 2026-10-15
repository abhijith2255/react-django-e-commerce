import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  // ആകെ തുക കണ്ടുപിടിക്കാൻ
  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0);

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-gray-800">Shopping Cart</h1>
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Continue Shopping &rarr;
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-400 mb-4">Your cart is empty 🛒</h2>
            <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Go to Store
            </Link>
          </div>
        ) : (
          <div>
            <div className="space-y-4 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-white" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                      <p className="text-blue-600 font-black">₹{item.price}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 font-bold px-4 py-2 hover:bg-red-50 rounded-lg transition-all">
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t pt-6 flex justify-between items-center">
              <div>
                <p className="text-gray-500">Total Amount:</p>
                <p className="text-3xl font-black text-gray-800">₹{totalPrice.toFixed(2)}</p>
              </div>
<Link to="/checkout">
  <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 shadow-lg active:scale-95 transition-all">
    Proceed to Checkout
  </button>
</Link>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Cart;