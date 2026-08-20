import React, { useState } from 'react';
import { useCampaigns } from '../../context/CampaignContext';
import { Sparkles, Star, ThumbsUp, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const FeedbackSurvey = ({ elapsedSeconds, taskStatuses, onSubmitSuccess }) => {
  const { activeTestCampaign, submitResponse } = useCampaigns();

  const [participantName, setParticipantName] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');
  const [npsScore, setNpsScore] = useState(8);
  const [seqScore, setSeqScore] = useState(6); // Single Ease Question (1 to 7)
  const [qualitativeAnswers, setQualitativeAnswers] = useState({});

  if (!activeTestCampaign) return null;

  const handleQualitativeChange = (qId, val) => {
    setQualitativeAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sentiment = npsScore >= 8 ? 'positive' : npsScore <= 6 ? 'negative' : 'neutral';
    
    // Tag generation logic based on score & answers
    const tags = [];
    if (seqScore >= 6) tags.push('High Usability');
    if (seqScore <= 3) tags.push('Friction Reported');
    if (npsScore >= 9) tags.push('Promoter');

    submitResponse({
      campaignId: activeTestCampaign.id,
      participantName: participantName.trim() || 'Anonymous Tester',
      participantEmail: participantEmail.trim() || 'tester@uxpulse.io',
      durationSeconds: elapsedSeconds,
      taskStatuses,
      npsScore,
      seqScore,
      susScore: Math.min(100, Math.round((seqScore / 7) * 90 + (npsScore / 10) * 10)),
      qualitativeAnswers,
      sentiment,
      tags: tags.length > 0 ? tags : ['Completed Session']
    });

    onSubmitSuccess();
  };

  return (
    <div style={{ maxWidth: '780px', margin: '30px auto', padding: '0 20px 50px' }} className="animate-fade-in">
      <div className="glass-panel" style={{ padding: '36px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--accent-gradient)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={28} color="white" />
          </div>
          <span className="badge badge-emerald" style={{ marginBottom: '8px' }}>
            Tasks Completed ({elapsedSeconds}s duration)
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Help Us Improve the UX!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '4px' }}>
            Please rate your quantitative experience and share any qualitative suggestions.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Quantitative #1: Net Promoter Score (0-10) */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>
              1. How likely are you to recommend this website / product flow? (NPS)
            </label>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '14px' }}>
              0 = Not at all likely, 10 = Extremely likely
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
                <button
                  key={score}
                  type="button"
                  className={`rating-pill ${npsScore === score ? 'selected' : ''}`}
                  onClick={() => setNpsScore(score)}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          {/* Quantitative #2: Single Ease Question (SEQ 1-7) */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>
              2. Single Ease Score (SEQ): How easy or difficult was completing your tasks?
            </label>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '14px' }}>
              1 = Very Difficult, 7 = Very Easy
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {[1, 2, 3, 4, 5, 6, 7].map(score => (
                <button
                  key={score}
                  type="button"
                  className={`rating-pill ${seqScore === score ? 'selected' : ''}`}
                  onClick={() => setSeqScore(score)}
                  style={{ width: '48px', height: '48px', fontSize: '1.1rem' }}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          {/* Qualitative Open Questions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {activeTestCampaign.customQuestions?.filter(q => q.type === 'qualitative').map((q, idx) => (
              <div key={q.id || idx}>
                <label style={{ display: 'block', fontSize: '0.92rem', fontWeight: 700, marginBottom: '6px' }}>
                  {idx + 3}. {q.prompt}
                </label>
                <textarea 
                  className="input-field"
                  rows={3}
                  required
                  placeholder="Share your specific thoughts, friction, or what was confusing..."
                  value={qualitativeAnswers[q.id] || ''}
                  onChange={(e) => handleQualitativeChange(q.id, e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Participant Info */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                Your Name (Optional)
              </label>
              <input 
                type="text"
                placeholder="Alex Morgan"
                className="input-field"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '4px' }}>
                Your Email (Optional)
              </label>
              <input 
                type="email"
                placeholder="alex@example.com"
                className="input-field"
                value={participantEmail}
                onChange={(e) => setParticipantEmail(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-gradient" 
            style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.05rem', marginTop: '10px' }}
          >
            <Send size={18} /> Submit Feedback & Complete Test
          </button>

        </form>

      </div>
    </div>
  );
};
