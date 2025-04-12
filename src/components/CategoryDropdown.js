import React from 'react';

export default function CategoryDropdown({ drugs, selectedCategory, setSelectedCategory }) {
  const uniqueCategories = [...new Set(drugs.map(d => d.category).filter(Boolean))];

  return (
    <div className="filter-dropdown">
      <label>Filter by Category: </label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">-- Show All --</option>
        {uniqueCategories.map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}
