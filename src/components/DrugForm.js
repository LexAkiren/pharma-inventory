import React from 'react';

export default function DrugForm({ newDrug, handleChange, handleAdd }) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Add New Drug</h3>
      <input
        name="name"
        placeholder="Drug Name"
        value={newDrug.name}
        onChange={handleChange}
      />
      <input
        name="quantity"
        type="number"
        placeholder="Quantity"
        value={newDrug.quantity}
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        step="0.01"
        placeholder="Price (₱)"
        value={newDrug.price}
        onChange={handleChange}
      />
      <button onClick={handleAdd}>Add Drug</button>
    </div>
  );
}
