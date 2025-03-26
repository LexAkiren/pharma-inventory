import React from 'react';

export default function FilterDropdown({ drugs, selectedDrug, setSelectedDrug }) {
  const drugNames = [...new Set(drugs.map((d) => d.name))];

  return (
    <div style={{ marginTop: '2rem' }}>
      <label><strong>Filter by Drug Name:</strong>{' '}</label>
      <select value={selectedDrug} onChange={(e) => setSelectedDrug(e.target.value)}>
        <option value="">-- Show All --</option>
        {drugNames.map((name, index) => (
          <option key={index} value={name}>{name}</option>
        ))}
      </select>
      {selectedDrug && (
        <button style={{ marginLeft: '1rem' }} onClick={() => setSelectedDrug('')}>
          Reset
        </button>
      )}
    </div>
  );
}
