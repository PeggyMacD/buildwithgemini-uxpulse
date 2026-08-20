import React from 'react';
import { useCampaigns } from '../../context/CampaignContext';
import { 
  TrendingUp, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  Smile, 
  Frown, 
  AlertTriangle,
  Lightbulb,
  Smartphone,
  Monitor,
  Target,
  BarChart2
} from 'lucide-react';

export const AnalyticsDashboard = () => {
  const { selectedCampaign, campaignResponses, getShareableUrl, setActiveTestId, setCurrentView } = useCampaigns();

  if (!selectedCampaign) return null;

  const totalResponses = campaignResponses.length;

  // Quantitative Calculations
  let avgSeq = 0;
  let avgNps = 0;
  let avgSus = 0;
  let avgDuration = 0;
  let totalTasksAttempted = 0;
  let totalTasksCompleted = 0;

  if (totalResponses > 0) {
    avgSeq = (campaignResponses.reduce((acc, r) => acc + (r.seqScore || 0), 0) / totalResponses).toFixed(1);
    avgNps = Math.round(campaignResponses.reduce((acc, r) => acc + (r.npsScore || 0), 0) / totalResponses);
    avgSus = Math.round(campaignResponses.reduce((acc, r) => acc + (r.susScore || 0), 0) / totalResponses);
    avgDuration = Math.round(campaignResponses.reduce((acc, r) => acc + (r.durationSeconds || 0), 0) / totalResponses);

    campaignResponses.forEach(r => {
      r.taskStatuses?.forEach(ts => {
        totalTasksAttempted++;
        if (ts.completed) totalTasksCompleted++;
      });
    });
  }

  const completionRate = totalTasksAttempted > 0 
    ? Math.round((totalTasksCompleted / totalTasksAttempted) * 100) 
    : 0;

  // Task-by-task completion breakdown
  const taskAnalytics = selectedCampaign.tasks.map(task => {
    let completed = 0;
    let total = 0;
    let easyCount = 0;
    let hardCount = 0;

    campaignResponses.forEach(r => {
      const match = r.taskStatuses?.find(ts => ts.taskId === task.id);
      if (match) {
        total++;
        if (match.completed) completed++;
        if (match.difficulty === 'easy') easyCount++;
        if (match.difficulty === 'hard') hardCount++;
      }
    });

    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { ...task, completed, total, rate, easyCount, hardCount };
  });

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px 40px' }} className="animate-fade-in">
      
      {/* Campaign Info Header */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="badge badge-indigo">Active Usability Campaign</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
              ID: {selectedCampaign.id}
            </span>
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '6px' }}>
            {selectedCampaign.title}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '800px' }}>
            {selectedCampaign.description}
          </p>
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.85rem', color: 'var(--text-subtle)' }}>
            <span>Target URL: <a href={selectedCampaign.targetUrl} target="_blank" rel="noreferrer" style={{ color: '#818cf8', textDecoration: 'underline' }}>{selectedCampaign.targetUrl}</a></span>
            <span>•</span>
            <span>Tasks Configured: <strong>{selectedCampaign.tasks.length}</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn-gradient"
            onClick={() => {
              setActiveTestId(selectedCampaign.id);
              setCurrentView('tester');
            }}
          >
            Run Test as Customer
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '32px' }}>
        
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px' }}>
            <span>Task Completion Rate</span>
            <CheckCircle2 size={18} color="#34d399" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: completionRate >= 70 ? '#34d399' : '#f59e0b' }}>
            {completionRate}%
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            {totalTasksCompleted} of {totalTasksAttempted} task steps completed
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px' }}>
            <span>Single Ease Score (SEQ)</span>
            <TrendingUp size={18} color="#818cf8" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#818cf8' }}>
            {avgSeq} <span style={{ fontSize: '1rem', color: 'var(--text-subtle)', fontWeight: 500 }}>/ 7</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            Benchmark: ≥ 5.5 indicates low friction
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px' }}>
            <span>Customer NPS Score</span>
            <Smile size={18} color="#fbbf24" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fbbf24' }}>
            {avgNps} <span style={{ fontSize: '1rem', color: 'var(--text-subtle)', fontWeight: 500 }}>/ 10</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            Net Promoter Likelihood rating
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px' }}>
            <span>Avg Time on Task</span>
            <Clock size={18} color="#06b6d4" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#06b6d4' }}>
            {avgDuration}s
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            Average test completion duration
          </p>
        </div>

      </div>

      {/* Main Analysis Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Column: Task-by-Task Funnel */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={18} color="#818cf8" /> Task Breakdown & Friction Analysis
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
              {totalResponses} total sessions analyzed
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {taskAnalytics.map((t, idx) => (
              <div key={t.id} className="glass-card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Step {idx + 1}
                    </span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '2px 0 4px' }}>{t.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.description}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: t.rate >= 75 ? '#34d399' : '#f59e0b' }}>
                      {t.rate}%
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>Success Rate</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', margin: '10px 0' }}>
                  <div 
                    style={{ 
                      width: `${t.rate}%`, 
                      height: '100%', 
                      background: t.rate >= 75 ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                      borderRadius: '4px',
                      transition: 'width 0.6s ease'
                    }} 
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '6px' }}>
                  <span className="badge badge-emerald">
                    Easy: {t.easyCount} testers
                  </span>
                  {t.hardCount > 0 && (
                    <span className="badge badge-rose">
                      Friction Reported: {t.hardCount} testers
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Insights & Key Takeaways */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Key Friction Card */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24' }}>
              <AlertTriangle size={18} /> Top Friction Highlights
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
              <li style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <strong>Mobile Keyboard Blocking:</strong> Multiple mobile users reported the promo code input box was obscured by the virtual keyboard.
              </li>
              <li style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <strong>Visual Feedback:</strong> Apply button lacks instant loading state while discount calculates.
              </li>
            </ul>
          </div>

          {/* Quick UX Action Items */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399' }}>
              <Lightbulb size={18} /> Recommended UX Quick Wins
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Auto-scroll viewport to Promo Code result when keyboard opens on iOS Safari.</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Display estimated taxes & shipping earlier in the cart preview drawer.</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
