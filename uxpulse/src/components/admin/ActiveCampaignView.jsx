import React, { useState } from 'react';
import { useCampaigns } from '../../context/CampaignContext';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { FeedbackFeed } from './FeedbackFeed';
import { CampaignBuilder } from './CampaignBuilder';
import { DeleteConfirmModal } from '../common/DeleteConfirmModal';
import { 
  Smile, 
  Lightbulb, 
  BarChart3, 
  MessageSquare, 
  Edit3, 
  Share2, 
  ExternalLink, 
  Check, 
  AlertTriangle,
  CheckCircle2,
  Frown,
  Meh,
  ThumbsUp,
  Trash2,
  Archive,
  RotateCcw
} from 'lucide-react';

export const ActiveCampaignView = () => {
  const { 
    selectedCampaign, 
    campaignResponses, 
    getShareableUrl, 
    setActiveTestId, 
    setCurrentView, 
    deleteCampaign,
    archiveCampaign,
    reactivateCampaign
  } = useCampaigns();

  const [activeTab, setActiveTab] = useState('sentiment'); // 'sentiment' | 'analytics' | 'feedback' | 'edit'
  const [copied, setCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!selectedCampaign) return null;

  const isArchived = selectedCampaign.status === 'archived';
  const totalResponses = campaignResponses.length;

  const handleCopy = () => {
    const url = getShareableUrl(selectedCampaign.id);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmDelete = () => {
    deleteCampaign(selectedCampaign.id);
    setShowDeleteModal(false);
  };

  const handleArchiveToggle = () => {
    if (isArchived) {
      reactivateCampaign(selectedCampaign.id);
    } else {
      const confirmArchive = window.confirm(
        `End and archive "${selectedCampaign.title}"?\n\nNew customer test submissions will be paused. You can reactivate this campaign at any time.`
      );
      if (confirmArchive) {
        archiveCampaign(selectedCampaign.id);
      }
    }
  };

  // Calculate sentiment breakdown
  const positiveCount = campaignResponses.filter(r => r.sentiment === 'positive').length;
  const negativeCount = campaignResponses.filter(r => r.sentiment === 'negative').length;
  const neutralCount = campaignResponses.filter(r => r.sentiment === 'neutral').length;

  const positivePct = totalResponses > 0 ? Math.round((positiveCount / totalResponses) * 100) : 0;
  const negativePct = totalResponses > 0 ? Math.round((negativeCount / totalResponses) * 100) : 0;
  const neutralPct = totalResponses > 0 ? Math.round((neutralCount / totalResponses) * 100) : 0;

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px 40px' }} className="animate-fade-in">
      
      {/* Active Campaign Sub-Header */}
      <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className={`badge ${isArchived ? 'badge-amber' : 'badge-orange'}`}>
                {isArchived ? 'Archived / Ended' : 'Active Campaign'}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
                {selectedCampaign.id}
              </span>
            </div>

            {/* Campaign Title + Inline Edit, Archive & Delete Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', margin: '2px 0 4px' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                {selectedCampaign.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button 
                  className="btn-secondary" 
                  onClick={() => setActiveTab('edit')}
                  style={{ fontSize: '0.78rem', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  title="Edit Campaign Details"
                >
                  <Edit3 size={13} color="#ff5a00" /> Edit
                </button>

                <button 
                  className="btn-secondary" 
                  onClick={handleArchiveToggle}
                  style={{ fontSize: '0.78rem', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '4px', color: isArchived ? '#34d399' : '#f59e0b' }}
                  title={isArchived ? "Reactivate Campaign" : "End & Archive Campaign"}
                >
                  {isArchived ? <RotateCcw size={13} /> : <Archive size={13} />}
                  {isArchived ? "Reactivate" : "End & Archive"}
                </button>

                <button 
                  className="btn-secondary" 
                  onClick={() => setShowDeleteModal(true)}
                  style={{ fontSize: '0.78rem', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '4px', color: '#f43f5e' }}
                  title="Delete Campaign"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              {selectedCampaign.description}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="btn-secondary" onClick={handleCopy} style={{ fontSize: '0.82rem', padding: '8px 14px' }}>
              {copied ? <Check size={14} color="#34d399" /> : <Share2 size={14} color="#ff5a00" />}
              {copied ? "Copied!" : "Share Link"}
            </button>
            <button 
              className="btn-gradient" 
              onClick={() => {
                setActiveTestId(selectedCampaign.id);
                setCurrentView('tester');
              }}
              style={{ fontSize: '0.82rem', padding: '8px 14px' }}
            >
              <ExternalLink size={14} /> Preview Test Flow
            </button>
          </div>
        </div>

        {/* 3 Streamlined Top Navigation Options */}
        <div style={{ display: 'flex', gap: '6px', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', flexWrap: 'wrap' }}>
          
          <button
            onClick={() => setActiveTab('sentiment')}
            className={activeTab === 'sentiment' ? 'btn-gradient' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Smile size={16} /> Sentiment Overview
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={activeTab === 'analytics' ? 'btn-gradient' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <BarChart3 size={16} /> Analytics
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={activeTab === 'feedback' ? 'btn-gradient' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <MessageSquare size={16} /> Customer Voice
          </button>

        </div>
      </div>

      {/* Tab 1: Sentiment Overview (Includes Recommendations below Sentiment) */}
      {activeTab === 'sentiment' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Sentiment Gauge Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Positive Sentiment</span>
                <ThumbsUp size={18} color="#34d399" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399' }}>
                {positivePct}%
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
                {positiveCount} of {totalResponses} participants had smooth flows
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Neutral Sentiment</span>
                <Meh size={18} color="#fbbf24" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24' }}>
                {neutralPct}%
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
                {neutralCount} of {totalResponses} participants noted minor observations
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Friction / Negative</span>
                <Frown size={18} color="#f87171" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f87171' }}>
                {negativePct}%
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
                {negativeCount} of {totalResponses} participants reported friction
              </p>
            </div>
          </div>

          {/* Sentiment Progress Breakdown Bar */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Smile size={18} color="#3b82f6" /> Customer Sentiment Breakdown
            </h3>

            <div style={{ height: '14px', borderRadius: '7px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden', display: 'flex', marginBottom: '16px' }}>
              <div style={{ width: `${positivePct}%`, background: '#10b981' }} title={`Positive: ${positivePct}%`} />
              <div style={{ width: `${neutralPct}%`, background: '#f59e0b' }} title={`Neutral: ${neutralPct}%`} />
              <div style={{ width: `${negativePct}%`, background: '#ef4444' }} title={`Negative: ${negativePct}%`} />
            </div>

            <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                <span>Promoters / Easy ({positiveCount})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                <span>Passives ({neutralCount})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <span>Detractors / Friction ({negativeCount})</span>
              </div>
            </div>
          </div>

          {/* Recommendations Integrated Below Sentiment */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ff5a00' }}>
                <AlertTriangle size={20} color="#ff5a00" /> Identified UX Friction Points
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li style={{ background: 'rgba(255, 90, 0, 0.08)', border: '1px solid rgba(255, 90, 0, 0.25)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                  <strong style={{ fontSize: '0.92rem', color: '#ff5a00', display: 'block', marginBottom: '4px' }}>Mobile Viewport Input Obscured</strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Virtual iOS keyboard covers the promo code input box during step 2.
                  </p>
                </li>
                <li style={{ background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.25)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                  <strong style={{ fontSize: '0.92rem', color: '#3b82f6', display: 'block', marginBottom: '4px' }}>Loading Indicator Missing</strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    CTA button lacks instant spinner feedback while calculating total.
                  </p>
                </li>
              </ul>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399' }}>
                <Lightbulb size={20} /> Recommended UX Action Items
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
                <div className="glass-card" style={{ padding: '14px', display: 'flex', gap: '12px' }}>
                  <CheckCircle2 size={20} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Auto-Scroll Focus on Mobile:</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2px' }}>
                      Auto-scroll input box into view when keyboard activates.
                    </p>
                  </div>
                </div>
                <div className="glass-card" style={{ padding: '14px', display: 'flex', gap: '12px' }}>
                  <CheckCircle2 size={20} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Cart Preview Drawer:</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2px' }}>
                      Show estimated taxes and shipping earlier in cart preview.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Analytics */}
      {activeTab === 'analytics' && <AnalyticsDashboard />}

      {/* Tab 3: Customer Voice */}
      {activeTab === 'feedback' && <FeedbackFeed />}

      {/* Tab 4: Edit */}
      {activeTab === 'edit' && (
        <CampaignBuilder 
          campaignToEdit={selectedCampaign}
          onSaved={() => setActiveTab('analytics')}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal 
        isOpen={showDeleteModal}
        campaign={selectedCampaign}
        responseCount={totalResponses}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

    </div>
  );
};
