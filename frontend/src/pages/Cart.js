import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const updateQuantity = (id, quantity) => {
    const newCart = cart.map(item => 
      item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (id) => {
    const newCart = cart.filter(item => item._id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const placeOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first!');
      navigate('/login');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/orders', {
        orderItems: cart.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        totalPrice: total
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert(`✅ Order placed for ₹${total}!`);
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/orders');
    } catch (error) {
      alert('Order failed: ' + (error.response?.data?.message || 'Server error'));
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{textAlign: 'center', padding: '50px'}}>
        <h2>🛒 Your cart is empty</h2>
        <Link to="/" style={{color: '#007bff', fontSize: '18px'}}>← Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{maxWidth: '900px', margin: '20px auto', padding: '20px'}}>
      <h1>🛒 Shopping Cart</h1>
      
      <div style={{marginBottom: '30px'}}>
        {cart.map(item => (
          <div key={item._id} style={{display: 'flex', gap: '20px', padding: '15px', border: '1px solid #ddd', marginBottom: '10px'}}>
            <img src={item.image} alt={item.name} style={{width: '80px', height: '80px', objectFit: 'cover'}} />
            
            <div style={{flex: 1}}>
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
            </div>
            
            <div>
              <input 
                type="number" 
                value={item.quantity} 
                onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                min="1"
                style={{width: '60px', padding: '5px'}}
              />
              <br/>
              <button 
                onClick={() => removeItem(item._id)}
                style={{background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', marginTop: '5px', cursor: 'pointer'}}
              >
                Remove
              </button>
            </div>
            
            <div style={{fontWeight: 'bold'}}>
              ₹{(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div style={{textAlign: 'right', padding: '20px', background: '#f8f9fa'}}>
        <h2>Total: ₹{total.toFixed(2)}</h2>
        <button 
          onClick={placeOrder}
          style={{background: '#28a745', color: 'white', border: 'none', padding: '15px 30px', fontSize: '18px', cursor: 'pointer'}}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;