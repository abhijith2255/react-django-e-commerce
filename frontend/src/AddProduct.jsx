import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // ലോഗിൻ ചെയ്തിട്ടുണ്ടോ എന്ന് പരിശോധിക്കുന്നു
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // ടോക്കൺ ഇല്ലെങ്കിൽ ലോഗിൻ പേജിലേക്ക് മാറ്റും
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // സേവ് ചെയ്ത ടോക്കൺ എടുക്കുന്നു

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    if (image) formData.append('image', image);

    axios.post('https://ecommerce121.pythonanywhere.com/api/products/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${token}` // ടോക്കൺ ബാക്കെൻഡിലേക്ക് അയക്കുന്നു
      }
    })
    .then(response => {
      alert("🎉 പ്രൊഡക്റ്റ് വിജയകരമായി ചേർത്തു!");
      setName(''); setDescription(''); setPrice(''); setStock('10'); setImage(null);
    })
    .catch(error => {
      console.error("Error adding product:", error);
      alert("ക്ഷമിക്കണം, പ്രൊഡക്റ്റ് ചേർക്കുന്നതിൽ തടസ്സമുണ്ടായി.");
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-gray-800">Add New Product</h1>
          <div className="flex gap-4">
            <Link to="/" className="text-blue-600 font-semibold hover:underline mt-2">View Store</Link>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600">Logout</button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Product Name</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Price (₹)</label>
            <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 outline-none"></textarea>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-2">Stock</label>
              <input type="number" required value={stock} onChange={(e) => setStock(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 outline-none" />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-2">Product Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none" />
            </div>
          </div>
          <button type="submit" className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-700 active:scale-95 transition-all shadow-lg mt-6">Save Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;