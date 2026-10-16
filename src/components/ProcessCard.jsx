import React from 'react';
import { ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ProcessCard({ process, onOpen }) {
  return (
    <article className="process-card" role="button" tabIndex="0"
      onClick={() => onOpen(process.id)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(process.id)}>
      <div className="process-card-top">
        <span className="process-icon" aria-hidden="true">{process.icon}</span>
        <StatusBadge status={process.status} />
      </div>
      <h3>{process.title}</h3>
      <p>{process.summary}</p>
      <div className="process-card-foot">
        <span>{process.area}</span><ChevronRight size={18} aria-hidden="true" />
      </div>
    </article>
  );
}
