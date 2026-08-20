import React, { useState } from 'react';
import { useCampaigns } from '../../context/CampaignContext';
import { 
  MessageSquare, 
  Star, 
  Search, 
  Filter, 
  User, 
  Smartphone, 
  Monitor, 
  Clock, 
  CheckCircle, 
  XCircle,
  Tag,
  ThumbsUp,
  ThumbsDown,
  X
} from 'lucide-react';

export const FeedbackFeed = () => {
  const { selectedCampaign, campaignResponses } = useCampaigns();
  const [searchTerm, setSearchTerm] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('all'); // 'all' | 'positive' | 'negative' | 'neutral'
  const [selectedResponse, setSelectedResponse] = useState(null);

  if (!selectedCampaign) return null;

  const filteredResponses = campaignResponses.filter(r => {
    const matchesSearch = 
      r.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.participantEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(r.qualitativeAnswers || {}).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSentiment = sentimentFilter === 'all' || r.sentiment === sentimentFilter;
    return matchesSearch && matchesSentiment;
  });

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px 40px' }} className="animate-fade-in">
      
      {/* Header & Filters */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={20} color="#818cf8" /> Customer Voice & Qualitative Feedback
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>
            Inspect step notes, verbatim feedback, and friction tags from customer test sessions.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search feedback or tester..."
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px', height: '38px', fontSize: '0.85rem' }}
            />
          </div>

          {/* Sentiment Filter */}
          <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.6)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setSentimentFilter('all')}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: sentimentFilter === 'all' ? 'var(--accent-primary)' : 'transparent',
                color: 'white',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              All ({campaignResponses.length})
            </button>
            <button
              onClick={() => setSentimentFilter('positive')}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: sentimentFilter === 'positive' ? 'rgba(16, 185, 129, 0.3)' : 'transparent',
                color: '#34d399',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Positive
            </button>
            <button
              onClick={() => setSentimentFilter('negative')}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: sentimentFilter === 'negative' ? 'rgba(239, 68, 68, 0.3)' : 'transparent',
                color: '#f87171',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Friction / Negative
            </button>
          </div>
        </div>
      </div>

      {/* Response Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '20px' }}>
        {filteredResponses.map(resp => (
          <div 
            key={resp.id} 
            className="glass-panel" 
            style={{ padding: '20px', cursor: 'pointer', transition: 'var(--transition)' }}
            onClick={() => setSelectedResponse(resp)}
          >
            {/* Participant Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                  {resp.participantName.charAt(0)}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{resp.participantName}</h4>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-subtle)' }}>{resp.participantEmail}</p>
                </div>
              </div>

              <span className={`badge ${resp.sentiment === 'positive' ? 'badge-emerald' : resp.sentiment === 'negative' ? 'badge-rose' : 'badge-amber'}`}>
                {resp.sentiment === 'positive' ? <ThumbsUp size={12} /> : <ThumbsDown size={12} />}
                {resp.sentiment}
              </span>
            </div>

            {/* Metrics Chips */}
            <div style={{ display: 'flex', gap: '10px', margin: '12px 0', padding: '10px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', display: 'block' }}>NPS Rating</span>
                <strong style={{ fontSize: '1.1rem', color: '#fbbf24' }}>{resp.npsScore}/10</strong>
              </div>
              <div style={{ width: '1px', background: 'var(--border-subtle)' }} />
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', display: 'block' }}>Ease Score (SEQ)</span>
                <strong style={{ fontSize: '1.1rem', color: '#818cf8' }}>{resp.seqScore}/7</strong>
              </div>
              <div style={{ width: '1px', background: 'var(--border-subtle)' }} />
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', display: 'block' }}>Duration</span>
                <strong style={{ fontSize: '1.1rem', color: '#06b6d4' }}>{resp.durationSeconds}s</strong>
              </div>
            </div>

            {/* Featured Qualitative Quote */}
            <div style={{ margin: '12px 0' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Key Participant Feedback:
              </span>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontStyle: 'italic', marginTop: '4px', lineHeight: '1.4' }}>
                "{Object.values(resp.qualitativeAnswers || {})[0] || 'No open feedback provided.'}"
              </p>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '14px' }}>
              {resp.tags?.map((t, idx) => (
                <span key={idx} className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>
                  <Tag size={10} /> {t}
                </span>
              ))}
            </div>

            <div style={{ marginTop: '14px', textAlign: 'right', fontSize: '0.78rem', color: '#818cf8', fontWeight: 600 }}>
              Click to view full session audit →
            </div>
          </div>
        ))}
      </div>

      {/* Participant Drilldown Modal */}
      {selectedResponse && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', padding: '28px', position: 'relative' }}>
            
            <button 
              onClick={() => setSelectedResponse(null)}
              style={{ position: 'absolute', right: '20px', top: '20px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '4px' }}>
              Participant Audit: {selectedResponse.participantName}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', marginBottom: '20px' }}>
              Device: {selectedResponse.device} • Completed: {new Date(selectedResponse.completedAt).toLocaleString()}
            </p>

            {/* Task Checklist Breakdown */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px', color: 'var(--accent-primary)' }}>
                Step-by-Step Task Performance:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedResponse.taskStatuses?.map((ts, i) => (
                  <div key={i} className="glass-card" style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.88rem' }}>Task {i + 1}</strong>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{ts.note || 'Completed step'}</p>
                    </div>
                    {ts.completed ? (
                      <span className="badge badge-emerald"><CheckCircle size={14} /> Completed</span>
                    ) : (
                      <span className="badge badge-rose"><XCircle size={14} /> Abandoned</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Qualitative Answers */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px', color: 'var(--accent-primary)' }}>
                Verbatim Customer Answers:
              </h4>
              {Object.entries(selectedResponse.qualitativeAnswers || {}).map(([qId, ans]) => (
                <div key={qId} style={{ marginBottom: '12px', background: 'rgba(15, 23, 42, 0.5)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', fontWeight: 600 }}>Question ID: {qId}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '4px' }}>{ans}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
