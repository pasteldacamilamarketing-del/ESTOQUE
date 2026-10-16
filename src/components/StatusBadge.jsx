import React from 'react';

export default function StatusBadge({ status = '' }) {
  const value = status.toLowerCase();
  const tone = value.includes('testado') ? 'success'
    : value.includes('validado') || value.includes('aprovado') ? 'info'
    : value.includes('pendente') || value.includes('provis') ? 'warning'
    : 'neutral';

  return <span className={`status-badge ${tone}`}>{status}</span>;
}
