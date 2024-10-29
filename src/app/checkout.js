
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function CheckoutPage() {
    const { cart, total, clearCart } = useContext(CartContext);

    const handlePayment = () => {
        alert('Pago exitoso');
        clearCart(); 
    };

    return (
        <div className="checkout-container">
            <h1>Tu carrito de compras</h1>
            <ul>
                {Object.values(cart).map((item) => (
                    <li key={item.id}>
                        {item.quantity} x {item.price}$ - {item.id}
                    </li>
                ))}
            </ul>
            <p>Total: ${total}</p>
            <button onClick={handlePayment}>Pagar</button>
        </div>
    );
}
