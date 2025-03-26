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
  confirmBuy // ✅ Use this instead of cart manipulation inside
}) {
  const [buyingId, setBuyingId] = useState(null);
  const [tempQuantities, setTempQuantities] = useState({});

  const handleQtyChange = (id, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setTempQuantities(prev => ({ ...prev, [id]: qty }));
  };

  return (
    <table style={{ width: '100%', marginTop: '2rem' }}>
      <thead>
        <tr>
          <th>Drug Name</th>
          <th>Quantity</th>
          <th>Price (₱)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {drugs.map((drug) => (
          <tr key={drug.id}>
            {editingId === drug.id ? (
              <>
                <td>
                  <input
                    value={editCache[drug.id]?.name || ''}
                    onChange={(e) => handleEditChange(drug.id, 'name', e.target.value)}
                  />
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                      onClick={() =>
                        handleEditChange(
                          drug.id,
                          'quantity',
                          Math.max(0, parseInt(editCache[drug.id]?.quantity || 0) - 1)
                        )
                      }
                    >−</button>
                    <input
                      type="number"
                      style={{ width: '60px', textAlign: 'center' }}
                      value={editCache[drug.id]?.quantity || ''}
                      onChange={(e) => handleEditChange(drug.id, 'quantity', e.target.value)}
                    />
                    <button
                      onClick={() =>
                        handleEditChange(
                          drug.id,
                          'quantity',
                          parseInt(editCache[drug.id]?.quantity || 0) + 1
                        )
                      }
                    >+</button>
                  </div>
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
                  <button onClick={() => saveEdit(drug.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </td>
              </>
            ) : (
              <>
                <td>{drug.name}</td>
                <td>{drug.quantity}</td>
                <td>₱{parseFloat(drug.price).toFixed(2)}</td>
                <td>
                  {user.role === 'admin' ? (
                    <>
                      <button onClick={() => startEdit(drug)}>Edit</button>
                      <button onClick={() => deleteDrug(drug.id)}>Delete</button>
                    </>
                  ) : (
                    buyingId === drug.id ? (
                      <>
                        <button onClick={() =>
                          handleQtyChange(drug.id, (tempQuantities[drug.id] || 1) - 1)
                        }>−</button>
                        <input
                          type="number"
                          value={tempQuantities[drug.id] || 1}
                          onChange={(e) => handleQtyChange(drug.id, e.target.value)}
                          style={{ width: '50px', textAlign: 'center' }}
                        />
                        <button onClick={() =>
                          handleQtyChange(drug.id, (tempQuantities[drug.id] || 1) + 1)
                        }>+</button>
                        <button onClick={() => {
                          confirmBuy(drug.id, tempQuantities[drug.id] || 1);
                          setBuyingId(null);
                        }}>Add</button>
                        <button onClick={() => setBuyingId(null)}>Cancel</button>
                      </>
                    ) : (
                      <button onClick={() => setBuyingId(drug.id)}>Buy</button>
                    )
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
