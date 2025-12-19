import React from 'react';

function LeadTable({ leads }) {
  if (!leads || leads.length === 0) {
    return <div>No leads to display yet. Submit a batch to get started.</div>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Predicted Country</th>
            <th>Confidence</th>
            <th>Status</th>
            <th>Synced to CRM</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.country || 'N/A'}</td>
              <td>{(lead.probability * 100).toFixed(1)}%</td>
              <td>{lead.status}</td>
              <td>{lead.syncedToCRM ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;


