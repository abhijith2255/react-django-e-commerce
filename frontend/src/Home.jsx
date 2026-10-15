import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

function Home() {
  const [products, setProducts] = useState([]);
  const { cart, addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get('https://ecommerce121.pythonanywhere.com//api/products/')
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 bg-white p-5 rounded-xl shadow-sm">
          <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">Highmax Store</h1>
          <Link to="/cart">
            <button className="bg-slate-800 text-white px-5 py-2 rounded-lg font-medium hover:bg-slate-700 transition-all">
              🛒 Cart ({cart ? cart.length : 0})
            </button>
          </Link>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <Link to={`/product/${product.id}`}>
                <div className="h-52 overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
              </Link>
              
              <div className="p-5">
                <Link to={`/product/${product.id}`}>
                  <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1 hover:text-blue-600 cursor-pointer">{product.name}</h2>
                </Link>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                  <span className="text-2xl font-black text-slate-800">₹{product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;