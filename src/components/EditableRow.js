import React from 'react';

export default function EditableRow({ drug, cache, onChange, onSave, onCancel }) {
  return (
    <>
      <td>
        <input
          value={cache.name}
          onChange={(e) => onChange(drug.id, 'name', e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          value={cache.quantity}
          onChange={(e) => onChange(drug.id, 'quantity', e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          step="0.01"
          value={cache.price}
          onChange={(e) => onChange(drug.id, 'price', e.target.value)}
        />
      </td>
      <td>
        <button onClick={() => onSave(drug.id)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </td>
    </>
  );
}
