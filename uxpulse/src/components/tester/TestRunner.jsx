import React, { useState, useEffect } from 'react';
import { useCampaigns } from '../../context/CampaignContext';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Monitor, 
  Smartphone, 
  Tablet, 
  ArrowRight, 
  Clock, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const TestRunner = ({ onFinishTasks, taskStatuses, setTaskStatuses }) => {
  const { activeTestCampaign } = useCampaigns();

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [viewport, setViewport] = useState('desktop'); // 'desktop' | 'mobile' | 'tablet'
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [frictionNote, setFrictionNote] = useState('');
  const [showFrictionModal, setShowFrictionModal] = useState(false);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!activeTestCampaign) return null;

  const currentTask = activeTestCampaign.tasks[currentTaskIndex];

  const handleMarkTaskComplete = (isSuccess) => {
    const newStatuses = [...taskStatuses];
    const existingIdx = newStatuses.findIndex(t => t.taskId === currentTask.id);
    
    const taskResult = {
      taskId: currentTask.id,
      completed: isSuccess,
      difficulty: isSuccess ? 'easy' : 'hard',
      note: frictionNote || (isSuccess ? 'Completed task smoothly.' : 'Encountered friction during step.')
    };

    if (existingIdx >= 0) {
      newStatuses[existingIdx] = taskResult;
    } else {
      newStatuses.push(taskResult);
    }

    setTaskStatuses(newStatuses);
    setFrictionNote('');
    setShowFrictionModal(false);

    if (currentTaskIndex < activeTestCampaign.tasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    } else {
      onFinishTasks(elapsedSeconds);
    }
  };

  // Viewport container width styles
  const viewportStyles = {
    desktop: { width: '100%', height: '100%' },
    tablet: { width: '768px', height: '90%', borderRadius: '16px', border: '12px solid #1e293b' },
    mobile: { width: '375px', height: '80%', borderRadius: '32px', border: '12px solid #1e293b' }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', height: 'calc(100vh - 120px)', gap: '16px', padding: '0 24px 24px' }}>
      
      {/* Left Column: Task Guidance Panel */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto' }}>
        
        <div>
          {/* Top Timer & Progress */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span className="badge badge-indigo">
              Step {currentTaskIndex + 1} of {activeTestCampaign.tasks.length}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#06b6d4', fontWeight: 600 }}>
              <Clock size={16} />
              {Math.floor(elapsedSeconds / 60)}m {elapsedSeconds % 60}s
            </div>
          </div>

          {/* Current Task Instructions */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
              Your Instructions:
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '6px 0 10px', lineHeight: '1.3' }}>
              {currentTask.title}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.5' }}>
              {currentTask.description}
            </p>
          </div>

          {/* Task Steps Progress Bar */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '4px', height: '6px', borderRadius: '3px', overflow: 'hidden', background: 'rgba(255, 255, 255, 0.08)' }}>
              {activeTestCampaign.tasks.map((_, idx) => (
                <div 
                  key={idx}
                  style={{
                    flex: 1,
                    background: idx <= currentTaskIndex ? 'var(--accent-gradient)' : 'transparent',
                    transition: 'var(--transition)'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              className="btn-success"
              onClick={() => handleMarkTaskComplete(true)}
              style={{ justifyContent: 'center', padding: '14px', width: '100%' }}
            >
              <CheckCircle2 size={18} /> Done! Next Step →
            </button>

            <button 
              className="btn-secondary"
              onClick={() => setShowFrictionModal(true)}
              style={{ justifyContent: 'center', padding: '12px', width: '100%', borderColor: 'rgba(245, 158, 11, 0.3)', color: '#fbbf24' }}
            >
              <AlertTriangle size={16} /> I Had Difficulty / Couldn't Complete
            </button>
          </div>

          {/* Friction Input Drawer */}
          {showFrictionModal && (
            <div className="glass-card" style={{ padding: '16px', marginTop: '16px', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#fbbf24', marginBottom: '6px' }}>
                What caused friction during this step?
              </label>
              <textarea 
                className="input-field"
                rows={2}
                placeholder="e.g. Button was hidden, input didn't respond..."
                value={frictionNote}
                onChange={(e) => setFrictionNote(e.target.value)}
                style={{ fontSize: '0.85rem' }}
              />
              <button 
                type="button"
                className="btn-gradient" 
                onClick={() => handleMarkTaskComplete(false)}
                style={{ width: '100%', marginTop: '8px', justifyContent: 'center', background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}
              >
                Submit Friction & Skip to Next
              </button>
            </div>
          )}

        </div>

        {/* Footer Note */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
          Interact with the live website preview on the right. Once finished, click "Done!".
        </div>

      </div>

      {/* Right Column: Live Web Workspace / Interactive Frame */}
      <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        
        {/* Workspace Top Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', fontWeight: 600 }}>Viewport Simulation:</span>
            <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.8)', padding: '2px', borderRadius: 'var(--radius-sm)' }}>
              <button 
                onClick={() => setViewport('desktop')}
                style={{ padding: '4px 10px', border: 'none', background: viewport === 'desktop' ? 'var(--accent-primary)' : 'transparent', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
                title="Desktop View"
              >
                <Monitor size={14} />
              </button>
              <button 
                onClick={() => setViewport('tablet')}
                style={{ padding: '4px 10px', border: 'none', background: viewport === 'tablet' ? 'var(--accent-primary)' : 'transparent', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
                title="Tablet View"
              >
                <Tablet size={14} />
              </button>
              <button 
                onClick={() => setViewport('mobile')}
                style={{ padding: '4px 10px', border: 'none', background: viewport === 'mobile' ? 'var(--accent-primary)' : 'transparent', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
                title="Mobile View"
              >
                <Smartphone size={14} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <span>Target:</span>
            <a href={activeTestCampaign.targetUrl} target="_blank" rel="noreferrer" style={{ color: '#818cf8', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'underline' }}>
              {activeTestCampaign.targetUrl} <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Live Website Viewport Container */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#090d16', borderRadius: 'var(--radius-md)', overflow: 'hidden', position: 'relative' }}>
          
          <iframe 
            src={activeTestCampaign.targetUrl}
            title="Target Website UX Test Preview"
            style={{
              ...viewportStyles[viewport],
              border: 'none',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              transition: 'all 0.3s ease'
            }}
            sandbox="allow-same-origin allow-scripts allow-forms"
          />

          {/* Fallback Overlay note if iframe X-Frame-Options blocks loading external site */}
          <div style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'rgba(15, 23, 42, 0.9)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.78rem', color: 'var(--text-subtle)', backdropFilter: 'blur(8px)' }}>
            💡 Tip: If your target site restricts iframe embedding, open site in new tab via link above while performing task steps.
          </div>

        </div>

      </div>

    </div>
  );
};
