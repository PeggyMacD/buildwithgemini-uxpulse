import React, { useState } from 'react';
import { useCampaigns } from '../context/CampaignContext';
import { 
  Activity, 
  Plus, 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  ExternalLink, 
  Menu,
  ChevronDown,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const Navigation = ({ onToggleSidebar, onCreateNew }) => {
  const { theme, toggleTheme, currentView, setCurrentView, setActiveTestId, selectedCampaignId } = useCampaigns();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLaunchTesterView = () => {
    setActiveTestId(selectedCampaignId);
    setCurrentView('tester');
    setShowProfileMenu(false);
  };

  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '12px 24px', position: 'sticky', top: 0, zIndex: 30 }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        
        {/* Left: Sidebar Toggle + Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {currentView === 'admin' && (
            <button 
              onClick={onToggleSidebar}
              className="btn-secondary"
              style={{ padding: '8px', borderRadius: 'var(--radius-md)' }}
              title="Toggle Campaigns Sidebar"
            >
              <Menu size={18} />
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'linear-gradient(135deg, #ff5a00 0%, #ff7300 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(255, 90, 0, 0.4)' }}>
              <Activity size={22} color="white" />
            </div>
            <span className="brand-title" style={{ fontSize: '1.3rem' }}>
              UXPulse
            </span>
          </div>
        </div>

        {/* Right: Primary Create CTA + Theme Toggle + Profile Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {currentView === 'admin' ? (
            <>
              {/* Primary Create CTA */}
              <button 
                className="btn-gradient" 
                onClick={onCreateNew}
                style={{ fontSize: '0.88rem', padding: '9px 18px' }}
              >
                <Plus size={16} />
                Create New Campaign
              </button>
            </>
          ) : (
            <button 
              className="btn-secondary" 
              onClick={() => setCurrentView('admin')}
              style={{ fontSize: '0.88rem' }}
            >
              ← Exit Preview & Return to Admin
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            className="btn-secondary"
            onClick={toggleTheme}
            style={{ padding: '8px 10px', borderRadius: 'var(--radius-md)' }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} color="#ff5a00" /> : <Moon size={18} color="#ff5a00" />}
          </button>

          {/* Profile Avatar & Menu */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowProfileMenu(prev => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                padding: '5px 10px 5px 6px',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #ff5a00 0%, #ff7300 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', color: 'white', boxShadow: '0 0 10px rgba(255, 90, 0, 0.3)' }}>
                UX
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Researcher
              </span>
              <ChevronDown size={14} color="var(--text-subtle)" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div 
                className="glass-panel" 
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '120%',
                  width: '220px',
                  padding: '12px',
                  zIndex: 100,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <strong style={{ fontSize: '0.88rem', display: 'block' }}>Senior UX Researcher</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>researcher@uxpulse.io</span>
                </div>

                <button 
                  onClick={handleLaunchTesterView}
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.8rem', padding: '8px 10px' }}
                >
                  <ExternalLink size={14} color="#ff5a00" /> Preview Test Runner
                </button>

                <button 
                  onClick={() => {
                    alert("Signed out of UXPulse session.");
                    setShowProfileMenu(false);
                  }}
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.8rem', padding: '8px 10px', color: '#f43f5e' }}
                >
                  <LogOut size={14} /> Log Out
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
