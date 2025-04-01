import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLog() {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost/pharma-backend/logs.php')
      .then(res => res.json())
      .then(setLogs)
      .catch(() => alert("Failed to load logs"));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={() => navigate('/')}>← Back to Inventory</button>
      <h3 style={{ marginTop: '1rem' }}>📋 Inventory Activity Log</h3>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>User</th>
            <th>Action</th>
            <th>Drug</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr><td colSpan="5">No activity yet.</td></tr>
          ) : (
            logs.map(log => (
              <tr key={log.id}>
                <td>{log.timestamp}</td>
                <td>{log.user}</td>
                <td>{log.action}</td>
                <td>{log.drug_name}</td>
                <td className={
                  log.quantity > 0 ? "log-positive" :
                  log.quantity < 0 ? "log-negative" :
                  "log-neutral"
                }>
                  {log.quantity > 0 ? `+${log.quantity}` : log.quantity}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
