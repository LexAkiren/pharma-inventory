import React from 'react';

const categories = [
  'Pain Relief',
  'Cold & Flu',
  'Vitamins',
  'Digestive Health',
  'Heart Health',
  'Asthma',
  'Diabetes'
];

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
      <select
        name="category"
        value={newDrug.category || ''}
        onChange={handleChange}
      >
        <option value="">-- Select Category --</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>{cat}</option>
        ))}
      </select>
      <button onClick={handleAdd}>Add Drug</button>
    </div>
  );
}
