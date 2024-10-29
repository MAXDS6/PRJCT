import { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState({});
    const [total, setTotal] = useState(0);

    const addToCart = (productId, productPrice) => {
        setCart((prevCart) => {
            const newCart = { ...prevCart };
            newCart[productId] = newCart[productId]
                ? { ...newCart[productId], quantity: newCart[productId].quantity + 1 }
                : { id: productId, price: productPrice, quantity: 1 };
            updateTotal(newCart);
            return newCart;
        });
    };

    const updateTotal = (newCart) => {
        const newTotal = Object.values(newCart).reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        setTotal(newTotal);
    };

    const clearCart = () => {
        setCart({});
        setTotal(0);
    };

    return (
        <CartContext.Provider value={{ cart, total, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
