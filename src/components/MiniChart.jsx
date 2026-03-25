// src/components/MiniChart.jsx
import React from 'react';
import { fmt } from '../utils';

export default function MiniChart({ data }) {
  // data = [{ label: 'Jan', value: 50000 }, ...]
  const max = Math.max(...data.map(d => d.value), 1);
  
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', height: '180px', gap: '12px', padding: '16px 0 8px 0' }}>
      {data.map((d, i) => {
        const heightPct = Math.max((d.value / max) * 100, 2); // min 2% height for visibility
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
            <div 
              style={{
                width: '100%',
                maxWidth: '40px',
                backgroundColor: 'var(--primary)',
                borderRadius: '6px 6px 0 0',
                height: `${heightPct}%`,
                transition: 'height 0.5s ease',
                position: 'relative',
                cursor: 'pointer'
              }} 
              title={fmt(d.value)}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px', fontWeight: 600 }}>
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
