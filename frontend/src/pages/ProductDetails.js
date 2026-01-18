import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(response.data.data);
      setError('');
    } catch (error) {
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item._id === product._id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`✅ Added ${quantity} x ${product.name} to cart!`);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div style={styles.center}>
        <div style={styles.loading}>⏳ Loading product...</div>
      </div>
    );
  }

  if (error  || !product) {
    return (
      <div style={styles.center}>
        <div style={styles.error}>
          <h2>❌ Product not found</h2>
          <Link to="/" style={styles.backLink}>← Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backButton}>← Back to Products</Link>
      
      <div style={styles.productContainer}>
        <div style={styles.imageContainer}>
          <img 
            src={product.image} 
            alt={product.name}
            style={styles.mainImage}
            onError={(e) => {
              e.target.src = "";
            }}
          />
        </div>

        <div style={styles.infoContainer}>
          <h1 style={styles.productName}>{product.name}</h1>
          
          <div style={styles.categoryBrand}>
            <span style={styles.category}>#{product.category}</span>
            {product.brand && <span style={styles.brand}>{product.brand}</span>}
          </div>

          <div style={styles.priceSection}>
            <h2 style={styles.price}>₹{product.price.toLocaleString()}</h2>
            <div style={styles.stockStatus}>
              {product.stock > 0 ? (
                <span style={styles.inStock}>✅ In Stock ({product.stock})</span>
              ) : (
                <span style={styles.outOfStock}>❌ Out of Stock</span>
              )}
            </div>
          </div>

          <div style={styles.description}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {product.stock > 0 && (
            <div style={styles.addToCartSection}>
              <div style={styles.quantitySection}>
                <label style={styles.quantityLabel}>Quantity:</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                  min="1"
                  max={product.stock}
                  style={styles.quantityInput}
                />
              </div>
              
              <button 
                onClick={addToCart}
                style={styles.addToCartButton}
                disabled={quantity > product.stock}
              >
                🛒 Add to Cart
              </button>
            </div>
          )}

          <div style={styles.divider}></div>
          <div style={styles.extraInfo}>
            <div style={styles.infoItem}>
              <span>Category:</span>
              <span>{product.category}</span>
            </div>
            {product.brand && (
              <div style={styles.infoItem}>
                <span>Brand:</span>
                <span>{product.brand}</span>
              </div>
            )}
            <div style={styles.infoItem}>
              <span>Added:</span>
              <span>{new Date(product.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  backButton: {
    display: 'inline-block',
    color: '#007bff',
    fontSize: '16px',
    marginBottom: '30px',
    padding: '10px 20px',
    background: '#f8f9fa',
    borderRadius: '8px',
    textDecoration: 'none'
  },
  productContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'start'
  },
  imageContainer: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
  },
  mainImage: {
    width: '100%',
    maxWidth: '500px',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '12px'
  },
  infoContainer: {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
  },
  productName: {
    fontSize: '32px',
    color: '#333',
    marginBottom: '15px',
    lineHeight: '1.2'
  },
  categoryBrand: {
    display: 'flex',
    gap: '15px',
    marginBottom: '25px'
  },
  category: {
    background: '#e7f3ff',
    color: '#007bff',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500'
  },
  brand: {
    background: '#f0f8ff',
    color: '#0d6efd',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '14px'
  },
  priceSection: {
    marginBottom: '30px'
  },
  price: {
    fontSize: '36px',
    color: '#28a745',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  stockStatus: {
    fontSize: '16px'
  },
  inStock: {
    color: '#28a745',
    fontWeight: '500'
  },
  outOfStock: {
    color: '#dc3545',
    fontWeight: '500'
  },
  description: {
    marginBottom: '30px'
  },
  description: {
    marginBottom: '8px',
    color: '#333',
    fontSize: '18px'
  },
  description: {
    lineHeight: '1.6',
    color: '#666',
    fontSize: '16px'
  },
  addToCartSection: {
    marginBottom: '40px',
    padding: '25px',
    background: '#f8f9fa',
    borderRadius: '12px'
  },
  quantitySection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px'
  },
  quantityLabel: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333'
  },
  quantityInput: {
    width: '80px',
    padding: '10px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    textAlign: 'center'
  },
  addToCartButton: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(45deg, #28a745, #20c997)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  divider: {
    height: '1px',
    background: '#e9ecef',
    margin: '30px 0'
  },
  extraInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #f1f3f4'
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    color: '#666'
  },
  loading: {
    fontSize: '24px'
  },
  error: {
    textAlign: 'center',
    padding: '40px'
  },
  backLink: {
    color: '#007bff',
    fontSize: '18px',
    marginTop: '20px',
    display: 'inline-block'
  }
};

export default ProductDetail;