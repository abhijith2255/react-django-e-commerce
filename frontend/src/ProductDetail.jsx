import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from './CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, addToCart } = useContext(CartContext); // ഇവിടെ cart ഇമ്പോർട്ട് ചെയ്തു

  useEffect(() => {
    axios.get(`https://ecommerce121.pythonanywhere.com//api/products/${id}/`)
      .then(response => setProduct(response.data))
      .catch(error => console.error("Error:", error));
  }, [id]);

  if (!product) return <div className="text-center py-20 text-xl font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8 bg-white p-5 rounded-xl shadow-sm">
         <Link to="/" className="text-blue-600 font-semibold hover:underline">
           &larr; Back to Store
         </Link>
         <Link to="/cart">
            <button className="bg-slate-800 text-white px-5 py-2 rounded-lg font-medium hover:bg-slate-700 transition-all">
              🛒 Cart ({cart ? cart.length : 0})
            </button>
          </Link>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 h-96 bg-gray-100 flex items-center justify-center">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>
          
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-2xl font-black text-blue-600 mb-6">₹{product.price}</p>
            <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>
            <p className="text-sm text-gray-500 mb-6">Stock Available: <span className="font-bold text-gray-800">{product.stock}</span></p>
            
            <button 
              onClick={() => addToCart(product)}
              className="bg-slate-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-700 active:scale-95 transition-all shadow-lg">
              Add to Cart 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;