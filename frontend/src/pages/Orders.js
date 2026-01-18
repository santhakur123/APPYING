import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to view orders');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/orders/myorders', {
        headers: { Authorization:` Bearer ${token}` }
      });
      setOrders(response.data.data);
      setError('');
    } catch (error) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{textAlign: 'center', padding: '50px'}}>
        <h2>⏳ Loading orders...</h2>
      </div>
    );
  }

  return (
    <div style={{maxWidth: '1000px', margin: '20px auto', padding: '20px'}}>
      <h1>📦 My Orders</h1>
      
      {error && (
        <div style={{background: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '5px', marginBottom: '20px'}}>
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div style={{textAlign: 'center', padding: '50px'}}>
          <h3>No orders found</h3>
          <Link to="/" style={{color: '#007bff'}}>← Start Shopping</Link>
        </div>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order._id} style={{border: '1px solid #ddd', padding: '20px', marginBottom: '15px', borderRadius: '8px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                <span><strong>Order ID:</strong> {order._id}</span>
                <span><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</span>
                <span style={{color: order.status === 'Pending' ? '#ffc107' : '#28a745'}}>
                  <strong>Status:</strong> {order.status}
                </span>
              </div>
              
              <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
                {order.orderItems.map(item => (
                  <div key={item.product._id} style={{display: 'flex', gap: '10px', padding: '10px', border: '1px solid #eee'}}>
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      style={{width: '50px', height: '50px', objectFit: 'cover'}}
                    />
                    <div>
                      <div>{item.product.name}</div>
                      <div>Qty: {item.quantity}</div>
                      <div>₹{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{textAlign: 'right', marginTop: '15px', fontSize: '20px', fontWeight: 'bold'}}>
                Total: ₹{order.totalPrice.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;