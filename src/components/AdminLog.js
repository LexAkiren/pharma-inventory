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

  const deleteLog = (id) => {
    if (window.confirm("Are you sure you want to delete this log entry?")) {
      fetch(`http://localhost/pharma-backend/logs.php?id=${id}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(() => {
          setLogs(prev => prev.filter(log => log.id !== id));
        })
        .catch(() => alert("Failed to delete log"));
    }
  };

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
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr><td colSpan="7">No activity yet.</td></tr>
          ) : (
            logs.map(log => (
              <tr key={log.id}>
                <td>{log.timestamp}</td>
                <td>{log.user}</td>
                <td style={{
                  fontWeight: ['CATEGORY', 'RENAME'].includes(log.action) ? 'bold' : 'normal',
                  color: log.action === 'CATEGORY' ? 'orange' :
                         log.action === 'BUY' ? 'green' :
                         log.action === 'EDIT' ? 'blue' :
                         log.action === 'DELETE' ? 'red' : 'black'
                }}>
                  {log.action}
                </td>
                <td>{log.drug_name}</td>
                <td className={
                  log.quantity > 0 ? "log-positive" :
                  log.quantity < 0 ? "log-negative" :
                  "log-neutral"
                }>
                  {log.quantity > 0 ? `+${log.quantity}` : log.quantity}
                </td>
                <td className={
                  log.price > 0 ? "log-positive" :
                  log.price < 0 ? "log-negative" :
                  "log-neutral"
                }>
                  {log.price !== null && log.price !== 0
                    ? `${log.price > 0 ? '+' : ''}₱${parseFloat(log.price).toFixed(2)}`
                    : "-"}
                </td>
                <td>
                  <button
                    onClick={() => deleteLog(log.id)}
                    style={{
                      backgroundColor: 'crimson',
                      color: 'white',
                      border: 'none',
                      padding: '4px 8px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
