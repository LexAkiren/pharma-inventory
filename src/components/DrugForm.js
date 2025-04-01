import React from 'react';

export default function DrugForm({ newDrug, handleChange, handleAdd }) {
  return (
    <div className="drug-form">
      <h3>Add New Drug</h3>
      <input
        type="text"
        name="name"
        placeholder="Drug Name"
        value={newDrug.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={newDrug.quantity}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        step="0.01"
        placeholder="Price (₱)"
        value={newDrug.price}
        onChange={handleChange}
      />
      <button onClick={handleAdd}>Add Drug</button>
    </div>
  );
}
