import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data.data);
      setError('');
    } catch (error) {
      setError('Failed to load products. Make sure backend is running!');
      console.error('Products error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.center}>
        <div style={styles.loading}>⏳ Loading products...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🛒 All Products</h1>
        <p style={styles.subtitle}>{products.length} items available</p>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {products.length === 0 && !loading && (
        <div style={styles.empty}>
          <h3>No products found</h3>
          <p>Add some products via POST /api/products</p>
        </div>
      )}
    </div>
  );
}

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} style={styles.productCard}>
      <div style={styles.productImage}>
        <img 
          src={product.image} 
          alt={product.name}
          style={styles.image}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>
      <div style={styles.productInfo}>
        <h3 style={styles.productName}>{product.name}</h3>
        <p style={styles.description}>{product.description?.substring(0, 80)}...</p>
        <div style={styles.priceStock}>
          <span style={styles.price}>₹{product.price}</span>
          <span style={styles.stock}>
            {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of Stock'}
          </span>
        </div>
        <div style={styles.category}>#{product.category}</div>
      </div>
    </Link>
  );
};
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  title: {
    fontSize: '36px',
    color: '#333',
    marginBottom: '10px'
  },
  subtitle: {
    fontSize: '18px',
    color: '#666'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '25px',
    marginBottom: '40px'
  },
  productCard: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    textDecoration: 'none',
    transition: 'transform 0.3s, box-shadow 0.3s',
    display: 'block'
  },
  productCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 30px rgba(0,0,0,0.15)'
  },
  productImage: {
    height: '220px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  productInfo: {
    padding: '20px'
  },
  productName: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '10px',
    lineHeight: '1.3'
  },
  description: {
    color: '#666',
    marginBottom: '15px',
    lineHeight: '1.5'
  },
  priceStock: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  price: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#28a745'
  },
  stock: {
    fontSize: '14px',
    color: '#666',
    padding: '4px 8px',
    background: '#f8f9fa',
    borderRadius: '12px'
  },
  category: {
    fontSize: '14px',
    color: '#007bff',
    background: '#e7f3ff',
    padding: '4px 12px',
    borderRadius: '20px',
    display: 'inline-block'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh'
  },
  loading: {
    fontSize: '24px',
    color: '#666'
  },
  error: {
    background: '#f8d7da',
    color: '#721c24',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #f5c6cb',
    marginBottom: '20px',
    textAlign: 'center'
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#666'
  }
};

export default Home;