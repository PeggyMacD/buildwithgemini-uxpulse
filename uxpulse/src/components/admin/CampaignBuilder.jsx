import React, { useState, useEffect } from 'react';
import { useCampaigns } from '../../context/CampaignContext';
import { PlusCircle, Trash2, CheckCircle2, Sparkles, Link, Target, Edit3, ArrowLeft } from 'lucide-react';

export const CampaignBuilder = ({ campaignToEdit, onSaved, onCancel }) => {
  const { addCampaign, updateCampaign } = useCampaigns();

  const isEditing = Boolean(campaignToEdit && campaignToEdit.id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetUrl, setTargetUrl] = useState('https://example.com');
  const [tasks, setTasks] = useState([
    { title: 'Locate Target Product', description: 'Search or navigate to find the target product item.' },
    { title: 'Complete Main Action', description: 'Click the primary CTA button (e.g. Add to Cart / Sign Up).' }
  ]);

  useEffect(() => {
    if (isEditing) {
      setTitle(campaignToEdit.title || '');
      setDescription(campaignToEdit.description || '');
      setTargetUrl(campaignToEdit.targetUrl || 'https://example.com');
      if (campaignToEdit.tasks && campaignToEdit.tasks.length > 0) {
        setTasks(campaignToEdit.tasks.map(t => ({ title: t.title, description: t.description })));
      }
    }
  }, [campaignToEdit, isEditing]);

  const handleAddTask = () => {
    setTasks(prev => [...prev, { title: '', description: '' }]);
  };

  const handleRemoveTask = (index) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
  };

  const handleTaskChange = (index, field, value) => {
    setTasks(prev => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !targetUrl.trim()) return;

    let savedCamp;
    if (isEditing) {
      savedCamp = updateCampaign({
        ...campaignToEdit,
        title,
        description,
        targetUrl,
        tasks: tasks.map((t, idx) => ({ ...t, id: `t${idx + 1}` }))
      });
    } else {
      savedCamp = addCampaign({
        title,
        description,
        targetUrl,
        tasks: tasks.map((t, idx) => ({ ...t, id: `t${idx + 1}` })),
        customQuestions: [
          { id: 'q1', type: 'nps', prompt: 'How likely are you to recommend this product/experience?' },
          { id: 'q2', type: 'seq', prompt: 'Overall, how easy was it to complete the task?' },
          { id: 'q3', type: 'qualitative', prompt: 'What part of the flow was most confusing or caused friction?' }
        ]
      });
    }

    if (onSaved) onSaved(savedCamp.id);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 40px' }} className="animate-fade-in">
      <div className="glass-panel" style={{ padding: '32px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isEditing ? <Edit3 size={22} color="white" /> : <PlusCircle size={22} color="white" />}
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                {isEditing ? 'Edit Usability Test Link' : 'Create New UX Feedback Link'}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                {isEditing ? `Modify settings and steps for test campaign (${campaignToEdit.id})` : 'Set up your website usability test, define step instructions, and generate a shareable customer link.'}
              </p>
            </div>
          </div>

          {onCancel && (
            <button type="button" className="btn-secondary" onClick={onCancel} style={{ fontSize: '0.82rem' }}>
              <ArrowLeft size={14} /> Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* General Details */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              Campaign / Usability Test Title
            </label>
            <input 
              type="text"
              required
              placeholder="e.g. New Pricing Page Usability & Conversion Audit"
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              Target Website / Prototype URL
            </label>
            <div style={{ position: 'relative' }}>
              <Link size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="url"
                required
                placeholder="https://yourwebsite.com/flow"
                className="input-field"
                style={{ paddingLeft: '40px' }}
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
              />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '4px', display: 'block' }}>
              This URL will be embedded in the customer's split-screen test runner.
            </span>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              Objective & Instructions for Customer
            </label>
            <textarea 
              rows={3}
              placeholder="Explain the goal of the test (e.g. Please test our new checkout process on mobile)."
              className="input-field"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Task Builder */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={18} color="#818cf8" /> Step-by-Step Customer Tasks
              </h3>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={handleAddTask}
                style={{ fontSize: '0.8rem', padding: '6px 12px' }}
              >
                + Add Task Step
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {tasks.map((task, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '16px', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
                      Step {idx + 1}
                    </span>
                    {tasks.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => handleRemoveTask(idx)}
                        style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                    <input 
                      type="text"
                      placeholder="Task Title (e.g. Add item to cart)"
                      className="input-field"
                      required
                      value={task.title}
                      onChange={(e) => handleTaskChange(idx, 'title', e.target.value)}
                    />
                    <input 
                      type="text"
                      placeholder="Task Description / Instructions"
                      className="input-field"
                      value={task.description}
                      onChange={(e) => handleTaskChange(idx, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div style={{ marginTop: '16px', textAlign: 'right' }}>
            <button type="submit" className="btn-gradient" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
              <Sparkles size={18} /> {isEditing ? 'Save Campaign Changes' : 'Generate Shareable UX Test Link'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
