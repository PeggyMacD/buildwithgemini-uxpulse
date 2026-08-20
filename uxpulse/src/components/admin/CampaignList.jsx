import React, { useState } from 'react';
import { useCampaigns } from '../../context/CampaignContext';
import { Layers, Share2, ExternalLink, Trash2, Check, Edit3, Plus } from 'lucide-react';

export const CampaignList = ({ onSelectCampaign, onCreateNew, onEditCampaign }) => {
  const { campaigns, responses, selectedCampaignId, setSelectedCampaignId, deleteCampaign, getShareableUrl, setActiveTestId, setCurrentView } = useCampaigns();
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (e, id) => {
    e.stopPropagation();
    const url = getShareableUrl(id);
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePreview = (e, id) => {
    e.stopPropagation();
    setActiveTestId(id);
    setCurrentView('tester');
  };

  const handleEdit = (e, campaign) => {
    e.stopPropagation();
    if (onEditCampaign) onEditCampaign(campaign);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this test campaign?")) {
      deleteCampaign(id);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} color="#818cf8" /> Active Shareable UX Test Campaigns ({campaigns.length})
        </h3>
        <button className="btn-secondary" onClick={onCreateNew} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
          <Plus size={14} /> New Test Link
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '14px' }}>
        {campaigns.map(c => {
          const respCount = responses.filter(r => r.campaignId === c.id).length;
          const isSelected = c.id === selectedCampaignId;

          return (
            <div 
              key={c.id} 
              className={`glass-card ${isSelected ? 'selected' : ''}`}
              style={{
                padding: '16px',
                border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'rgba(30, 41, 59, 0.4)',
                cursor: 'pointer'
              }}
              onClick={() => {
                setSelectedCampaignId(c.id);
                if (onSelectCampaign) onSelectCampaign(c.id);
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>
                  {respCount} Responses Collected
                </span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button 
                    onClick={(e) => handleEdit(e, c)}
                    style={{ background: 'transparent', border: 'none', color: '#818cf8', cursor: 'pointer', padding: '2px' }}
                    title="Edit Campaign"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, c.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer', padding: '2px' }}
                    title="Delete Campaign"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '4px' }}>{c.title}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {c.description}
              </p>

              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                <button 
                  className="btn-secondary" 
                  onClick={(e) => handleCopy(e, c.id)}
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.76rem', padding: '6px' }}
                >
                  {copiedId === c.id ? <Check size={13} color="#34d399" /> : <Share2 size={13} />}
                  {copiedId === c.id ? "Copied" : "Copy Link"}
                </button>
                <button 
                  className="btn-gradient" 
                  onClick={(e) => handlePreview(e, c.id)}
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.76rem', padding: '6px' }}
                >
                  <ExternalLink size={13} /> Run Test
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
