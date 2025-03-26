import React from 'react';

export default function Cart({ cart, updateCartQty, removeFromCart, checkout }) {
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
      <h3>🛒 Cart</h3>
      {cart.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Drug</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => updateCartQty(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      style={{ borderRadius: '50%', width: '28px', height: '28px' }}
                    >
                      <img src="/icons/minus.svg" alt="-" width="14" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartQty(item.id, Math.max(1, parseInt(e.target.value)))
                      }
                      style={{ width: '50px', textAlign: 'center' }}
                    />
                    <button
                      onClick={() => updateCartQty(item.id, item.quantity + 1)}
                      style={{ borderRadius: '50%', width: '28px', height: '28px' }}
                    >
                      <img src="/icons/plus.svg" alt="+" width="14" />
                    </button>
                  </div>
                </td>
                <td>₱{item.price}</td>
                <td>₱{(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeFromCart(item.id)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {cart.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Total:</strong> ₱{total.toFixed(2)}</p>
          <button onClick={checkout}>✅ Checkout</button>
        </div>
      )}
    </div>
  );
}
