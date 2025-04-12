import React, { useState } from 'react';

export default function DrugTable({
  drugs,
  user,
  editingId,
  editCache,
  startEdit,
  handleEditChange,
  cancelEdit,
  saveEdit,
  deleteDrug,
  confirmBuy
}) {
  const [quantities, setQuantities] = useState({});
  const [buyingId, setBuyingId] = useState(null); // Tracks which row is in "buy mode"

  const updateQty = (id, change) => {
    const current = parseInt(quantities[id] || 1);
    const max = parseInt(drugs.find(d => d.id === id)?.quantity || 1);

    let newQty = current + change;
    if (newQty < 1) newQty = 1;
    if (newQty > max) newQty = max;

    setQuantities(prev => ({ ...prev, [id]: newQty }));
  };

  const handleQtyInput = (id, value) => {
    const qty = parseInt(value);
    const drug = drugs.find(d => d.id === id);
    if (!isNaN(qty) && qty >= 1 && qty <= drug.quantity) {
      setQuantities(prev => ({ ...prev, [id]: qty }));
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Drug Name</th>
          <th>Quantity</th>
          <th>Price (₱)</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {drugs.map(drug => (
          <tr key={drug.id}>
            {editingId === drug.id ? (
              <>
                <td>
                  <input
                    type="text"
                    value={editCache[drug.id]?.name || ''}
                    onChange={(e) => handleEditChange(drug.id, 'name', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={editCache[drug.id]?.quantity || ''}
                    onChange={(e) => handleEditChange(drug.id, 'quantity', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="0.01"
                    value={editCache[drug.id]?.price || ''}
                    onChange={(e) => handleEditChange(drug.id, 'price', e.target.value)}
                  />
                </td>
                <td>
                  <select
                    value={editCache[drug.id]?.category || ''}
                    onChange={(e) => handleEditChange(drug.id, 'category', e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    <option value="Pain Relief">Pain Relief</option>
                    <option value="Cold & Flu">Cold & Flu</option>
                    <option value="Cough">Cough</option>
                    <option value="Vitamins">Vitamins</option>
                    <option value="Digestive Health">Digestive Health</option>
                    <option value="Heart Health">Heart Health</option>
                    <option value="Asthma">Asthma</option>
                    <option value="Diabetes">Diabetes</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => saveEdit(drug.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </td>
              </>
            ) : (
              <>
                <td>{drug.name}</td>
                <td>{drug.quantity}</td>
                <td>₱{parseFloat(drug.price).toFixed(2)}</td>
                <td>{drug.category || '-'}</td>
                <td>
                  {user.role === 'admin' ? (
                    <>
                      <button onClick={() => startEdit(drug)}>Edit</button>
                      <button onClick={() => deleteDrug(drug.id)}>Delete</button>
                    </>
                  ) : (
                    <>
                      {buyingId === drug.id ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <button onClick={() => updateQty(drug.id, -1)}>-</button>
                            <input
                              type="number"
                              value={quantities[drug.id] || 1}
                              min="1"
                              max={drug.quantity}
                              style={{ width: '50px', margin: '0 5px' }}
                              onChange={(e) => handleQtyInput(drug.id, e.target.value)}
                            />
                            <button onClick={() => updateQty(drug.id, 1)}>+</button>
                          </div>
                          <button
                            style={{ marginTop: '5px' }}
                            onClick={() => {
                              const qty = quantities[drug.id] || 1;
                              confirmBuy(drug.id, qty);
                              setBuyingId(null); // Reset buy state
                            }}
                          >
                            Confirm Buy
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => {
                          setBuyingId(drug.id);
                          setQuantities(prev => ({ ...prev, [drug.id]: 1 }));
                        }}>
                          Buy
                        </button>
                      )}
                    </>
                  )}
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
