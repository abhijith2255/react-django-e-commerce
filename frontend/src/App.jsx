import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Checkout from './Checkout'; // പുതിയത്
import { CartProvider } from './CartContext'; 

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} /> {/* പുതിയ റൂട്ട് */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;