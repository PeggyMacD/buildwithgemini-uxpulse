import React from 'react';
import { useCampaigns } from '../../context/CampaignContext';
import { CheckCircle2, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

export const ThankYouScreen = () => {
  const { setCurrentView } = useCampaigns();

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-panel animate-fade-in" style={{ maxWidth: '580px', width: '100%', padding: '44px', textAlign: 'center' }}>
        
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)' }}>
          <CheckCircle2 size={40} color="white" />
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '10px' }}>
          Thank You for Your Feedback!
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.6', marginBottom: '28px' }}>
          Your quantitative scores and qualitative responses have been logged directly into the UX Research Analytics Dashboard.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            className="btn-gradient"
            onClick={() => setCurrentView('admin')}
            style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
          >
            <Activity size={18} /> View Responses in Researcher Dashboard
          </button>
        </div>

        <div style={{ marginTop: '24px', fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
          Powered by <strong>UXPulse Usability Testing Platform</strong>
        </div>

      </div>
    </div>
  );
};
