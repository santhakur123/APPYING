import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// 1. Move styles here so they are defined before the function uses them
const styles = {
  container: { minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  formCard: { background: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" },
  title: { textAlign: "center", marginBottom: "30px", color: "#333", fontSize: "28px" },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column" },
  label: { marginBottom: "8px", fontWeight: "500", color: "#555" },
  input: { padding: "12px 16px", border: "2px solid #e1e5e9", borderRadius: "8px", fontSize: "16px" },
  button: { padding: "14px", background: "#28a745", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "600", cursor: "pointer" },
  error: { background: "#f8d7da", color: "#721c24", padding: "12px", borderRadius: "8px", border: "1px solid #f5c6cb", marginBottom: "20px" },
  loginLink: { textAlign: "center", marginTop: "20px", color: "#666" },
  link: { color: "#007bff", fontWeight: "500" },
};

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      
      console.log(response.data); // Using the variable to clear the ESLint warning
      alert("✅ Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>📝 Register</h2>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name</label>
            <input type="text" name="name" value={name} onChange={handleChange} required style={styles.input} placeholder="John Doe" disabled={loading} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input type="email" name="email" value={email} onChange={handleChange} required style={styles.input} placeholder="john@example.com" disabled={loading} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input type="password" name="password" value={password} onChange={handleChange} required minLength="6" style={styles.input} placeholder="At least 6 characters" disabled={loading} />
          </div>
          <button type="submit" disabled={loading} style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p style={styles.loginLink}>
          Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;