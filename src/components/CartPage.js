import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartPage({ cart, setCart, updateCartQty, removeFromCart, checkout }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price);
    const subtotal = price * item.quantity;
    return sum + (isNaN(subtotal) ? 0 : subtotal);
  }, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate('/')}>← Back to Inventory</button>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <table style={{ width: '100%', marginTop: '1rem' }}>
            <thead>
              <tr>
                <th>Drug</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={`${item.id}-${item.name}`}>
                  <td>{item.name}</td>
                  <td>
                    <button onClick={() => updateCartQty(item.id, Math.max(1, item.quantity - 1))}>−</button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartQty(item.id, Math.max(1, parseInt(e.target.value) || 1))
                      }
                      style={{ width: '50px', textAlign: 'center' }}
                    />
                    <button onClick={() => updateCartQty(item.id, item.quantity + 1)}>+</button>
                  </td>
                  <td>₱{parseFloat(item.price).toFixed(2)}</td>
                  <td>₱{(item.quantity * parseFloat(item.price)).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: '1rem' }}>Total: ₱{total.toFixed(2)}</h3>
          <button onClick={checkout}>Checkout</button>
        </>
      )}
    </div>
  );
}
