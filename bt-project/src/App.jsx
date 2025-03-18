// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Products from './pages/Products';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Login from './pages/Login';
import About from './pages/About';
import Register from './pages/Register';
import { CartProvider } from './context/CartContext';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/Dashboard';
import RequireAuth from './components/RequireAuth';
import Checkout from './pages/Checkout';
import Comprobante from './pages/Comprobante';
import "./App.css";

const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalogo" element={<Products />} />
            <Route path="/iniciar-sesion" element={<Login />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/sobre-nosotros" element={<About />} />
            <Route path="/registrarse" element={<Register />} />
            <Route path="/detalle-producto/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/comprobante" element={<Comprobante />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth adminOnly>
                  <Dashboard />
                </RequireAuth>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;