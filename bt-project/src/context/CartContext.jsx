import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user, isAuthChecked } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const { logout } = useAuth(); 

    // 1. Guardar carrito en localStorage
    const saveCartToLocalStorage = (cart) => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Error guardando en localStorage:', error);
        }
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart'); // Limpiar también de localStorage si es necesario
    };

    // 2. Cargar carrito desde localStorage al inicializar
    useEffect(() => {
        const loadCart = () => {
            try {
                const savedCart = localStorage.getItem('cart');
                if (savedCart) setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Error cargando carrito:', error);
            } finally {
                setIsInitialized(true);
            }
        };

        loadCart();
    }, []);

    // 3. Sincronización con servidor y localStorage
    useEffect(() => {
        const controller = new AbortController();

        const syncCart = async () => {
            if (!isInitialized || !user?.id) return; // 👈 Validación adicional

            try {
                await axios.put(`/api/cart/${user.id}`,
                    { items: cartItems.map(/*...*/) },
                    {
                        signal: controller.signal,
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}` // 👈 Envío dual
                        }
                    }
                );
            } catch (error) {
                if (error.response?.status === 401) {
                    logout(); // Limpiar estado y cookies
                    navigate('/login'); // Redirigir
                }
            }
        };

        syncCart();
        return () => controller.abort();
    }, [cartItems, user, isInitialized]);

    // 4. Fusionar carritos al autenticarse
    useEffect(() => {
        const mergeCarts = async () => {
            if (user?.id && isInitialized) {
                try {
                    const { data: serverCart } = await axios.get(`/api/cart/${user.id}`, {
                        withCredentials: true,
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}` // Envío dual
                        }
                    });

                    // ... lógica de fusión de carritos
                } catch (error) {
                    if (error.response?.status === 401) {
                        // Manejar expiración de token
                        console.error('Sesión expirada - Redirigiendo a login');
                        // Ejemplo: logoutUser();
                    }
                }
            }
        };
        mergeCarts();
    }, [user?.id, isInitialized]);

    // 5. Añadir al carrito con actualización optimizada
    const addToCart = (product, size = null) => {
        setCartItems(prev => {
            const existingIndex = prev.findIndex(item =>
                item.product._id === product._id && item.size === size
            );

            const newCart = existingIndex > -1
                ? prev.map((item, index) =>
                    index === existingIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
                : [...prev, { product, quantity: 1, size }];

            return newCart;
        });
    };

    // 6. Eliminar del carrito
    const removeFromCart = useCallback((index) => {
        setCartItems(prev => prev.filter((_, i) => i !== index));
    }, [setCartItems]);

    // 7. Calcular total
    const cartTotal = cartItems.reduce((total, item) =>
        total + (item.product.precio || 0) * (item.quantity || 1), 0
    );

    return (
        <CartContext.Provider value={{
            cartItems,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            cartTotal,
            isInitialized,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);