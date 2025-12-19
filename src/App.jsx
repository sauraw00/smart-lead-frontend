import React, { useEffect, useState } from 'react';
import LeadForm from './components/LeadForm';
import LeadTable from './components/LeadTable';
import { getApiUrl } from './config/api';

function App() {
  const [leads, setLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchLeads = async (status) => {
    try {
      setLoading(true);
      setError('');

      let url = getApiUrl('api/leads');
      if (status && status !== 'All') {
        const encoded = encodeURIComponent(status);
        url += `?status=${encoded}`;
      }

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch leads');
      }
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(statusFilter);
  }, [statusFilter]);

  const handleSubmitNames = async (namesString) => {
    const names = namesString
      .split(',')
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    if (names.length === 0) {
      setError('Please enter at least one valid name.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await fetch(getApiUrl('api/leads/enrich'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ names })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to enrich leads');
      }

      await res.json();
      // Refresh leads after successful enrichment
      await fetchLeads(statusFilter);
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Smart Lead Automation Dashboard</h1>
        <p>Batch enrich first names with predicted country and confidence.</p>
      </header>

      <main>
        <section className="card">
          <LeadForm onSubmitNames={handleSubmitNames} loading={loading} />
        </section>

        <section className="card">
          <div className="card-header">
            <h2>Processed Leads</h2>
            <div className="filters">
              <label htmlFor="statusFilter">Status Filter:</label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Verified">Verified</option>
                <option value="To Check">To Check</option>
              </select>
            </div>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {loading && <div className="loading">Loading...</div>}

          <LeadTable leads={leads} />
        </section>
      </main>
    </div>
  );
}

export default App;


