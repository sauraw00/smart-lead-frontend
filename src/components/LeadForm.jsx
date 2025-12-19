import React, { useState } from 'react';

function LeadForm({ onSubmitNames, loading }) {
  const [namesInput, setNamesInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitNames(namesInput);
  };

  return (
    <form onSubmit={handleSubmit} className="lead-form">
      <label htmlFor="namesInput">Enter first names (comma-separated):</label>
      <textarea
        id="namesInput"
        rows={3}
        placeholder="e.g. Peter, Aditi, Ravi, Satoshi"
        value={namesInput}
        onChange={(e) => setNamesInput(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Submit Batch'}
      </button>
    </form>
  );
}

export default LeadForm;


