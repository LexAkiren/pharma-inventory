import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartPage({ cart, setCart, updateCartQty, removeFromCart, checkout }) {
  const navigate = useNavigate();
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const handleCheckout = () => {
    const orderNo = Math.floor(100000 + Math.random() * 900000);
    const receipt = {
      orderNo,
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price),
        total: item.quantity * parseFloat(item.price)
      })),
      total: cart.reduce((sum, item) => sum + item.quantity * parseFloat(item.price), 0)
    };

    checkout();
    setReceiptData(receipt);
    setShowReceipt(true);
  };

  return (
    <div className="cart-box">
      <button onClick={() => navigate('/')}>← Back to Inventory</button>
      <h2>Your Cart</h2>

      {!showReceipt ? (
        cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            <table>
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
                      <div className="qty-buttons">
                        <button
                          className="qty-btn"
                          onClick={() => updateCartQty(item.id, Math.max(1, item.quantity - 1))}
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartQty(item.id, Math.max(1, parseInt(e.target.value) || 1))
                          }
                        />
                        <button
                          className="qty-btn"
                          onClick={() => updateCartQty(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
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

            <h3 className="cart-summary">
              Total: ₱{cart.reduce((sum, item) => sum + item.quantity * parseFloat(item.price), 0).toFixed(2)}
            </h3>
            <button onClick={handleCheckout}>✅ Checkout</button>
          </>
        )
      ) : (
        <div className="receipt">
          <h2>🧾 Receipt</h2>
          <p><strong>Order No:</strong> #{receiptData.orderNo}</p>

          <table style={{ width: '100%', marginTop: '1rem' }}>
            <thead>
              <tr>
                <th align="left">Drug</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {receiptData.items.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td align="center">{item.quantity}</td>
                  <td align="right">₱{item.price.toFixed(2)}</td>
                  <td align="right">₱{item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr />
          <p style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '18px' }}>
            Total: ₱{receiptData.total.toFixed(2)}
          </p>
          <p className="success-message">
            ✔️ Please proceed to the counter to claim your order.
          </p>
        </div>
      )}
    </div>
  );
}
