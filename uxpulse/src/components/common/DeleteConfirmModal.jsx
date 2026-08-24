import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export const DeleteConfirmModal = ({ isOpen, campaign, responseCount = 0, onConfirm, onCancel }) => {
  if (!isOpen || !campaign) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      className="animate-fade-in"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Delete campaign confirmation"
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '28px',
          background: 'var(--bg-card)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          aria-label="Close dialog"
          style={{ position: 'absolute', right: '18px', top: '18px', background: 'transparent', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer' }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AlertTriangle size={24} color="#ef4444" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Delete Campaign?
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#ef4444', fontWeight: 600 }}>
              Action cannot be undone
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '20px' }}>
          Are you sure you want to permanently delete <strong style={{ color: 'var(--text-main)' }}>"{campaign.title}"</strong> (<code style={{ fontSize: '0.8rem' }}>{campaign.id}</code>)?
        </p>

        {responseCount > 0 && (
          <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', color: '#f87171', marginBottom: '20px' }}>
            ⚠️ This will also permanently delete <strong>{responseCount}</strong> collected customer response audit logs.
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={onCancel}
            style={{ fontSize: '0.85rem', padding: '10px 18px' }}
          >
            Cancel
          </button>
          
          <button 
            type="button" 
            onClick={onConfirm}
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: '10px 18px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(239, 68, 68, 0.3)'
            }}
          >
            <Trash2 size={16} /> Permanently Delete
          </button>
        </div>

      </div>
    </div>
  );
};
