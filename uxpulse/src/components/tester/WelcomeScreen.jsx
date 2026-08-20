import React from 'react';
import { useCampaigns } from '../../context/CampaignContext';
import { Activity, Play, Clock, CheckCircle2, ShieldCheck, Archive } from 'lucide-react';

export const WelcomeScreen = ({ onStart }) => {
  const { activeTestCampaign, setCurrentView } = useCampaigns();

  if (!activeTestCampaign) return null;

  const isArchived = activeTestCampaign.status === 'archived';

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-panel animate-fade-in" style={{ maxWidth: '640px', width: '100%', padding: '40px', textAlign: 'center' }}>
        
        <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: isArchived ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'var(--accent-gradient)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isArchived ? '0 0 30px rgba(245, 158, 11, 0.3)' : '0 0 30px rgba(99, 102, 241, 0.4)' }}>
          {isArchived ? <Archive size={32} color="white" /> : <Activity size={32} color="white" />}
        </div>

        <span className={`badge ${isArchived ? 'badge-amber' : 'badge-indigo'}`} style={{ marginBottom: '12px' }}>
          {isArchived ? 'Usability Test Ended' : 'Customer Usability Session'}
        </span>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '8px 0 12px', lineHeight: '1.3' }}>
          {activeTestCampaign.title}
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '28px' }}>
          {isArchived 
            ? "Thank you for your interest! This usability feedback campaign has been completed and archived by the research team." 
            : activeTestCampaign.description}
        </p>

        {isArchived ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="glass-card" style={{ padding: '16px', color: '#fbbf24', fontSize: '0.88rem' }}>
              ℹ️ Submissions for this campaign are currently paused.
            </div>
            <button 
              className="btn-secondary" 
              onClick={() => setCurrentView('admin')}
              style={{ justifyContent: 'center', padding: '12px' }}
            >
              Return to Researcher Dashboard
            </button>
          </div>
        ) : (
          <>
            {/* Quick Details Box */}
            <div className="glass-card" style={{ padding: '20px', textAlign: 'left', marginBottom: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Clock size={20} color="#818cf8" />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block' }}>Estimated Time</span>
                  <strong style={{ fontSize: '0.9rem' }}>3 - 5 Minutes</strong>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={20} color="#34d399" />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block' }}>Tasks to Complete</span>
                  <strong style={{ fontSize: '0.9rem' }}>{activeTestCampaign.tasks.length} Step(s)</strong>
                </div>
              </div>
            </div>

            <button 
              className="btn-gradient"
              onClick={onStart}
              style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.05rem' }}
            >
              <Play size={20} /> Begin Usability Test
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '20px', fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
              <ShieldCheck size={14} color="#34d399" /> Anonymous UX Research • No personal data recorded automatically
            </div>
          </>
        )}

      </div>
    </div>
  );
};
