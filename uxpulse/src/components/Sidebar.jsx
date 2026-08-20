import React, { useState } from 'react';
import { useCampaigns } from '../context/CampaignContext';
import { DeleteConfirmModal } from './common/DeleteConfirmModal';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  ChevronRight,
  Archive,
  RotateCcw,
  ArrowUpDown
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose, onCreateNew, onEditCampaign, isCreatingNew, onSelectCampaign }) => {
  const { 
    campaigns, 
    responses, 
    selectedCampaignId, 
    setSelectedCampaignId, 
    deleteCampaign, 
    archiveCampaign,
    reactivateCampaign,
    setActiveTestId, 
    setCurrentView 
  } = useCampaigns();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'active' | 'archived'
  const [sortBy, setSortBy] = useState('recent'); // 'recent' | 'responses'
  const [campaignToDelete, setCampaignToDelete] = useState(null);

  const processedCampaigns = campaigns
    .filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.id.toLowerCase().includes(searchTerm.toLowerCase());
      const isArchived = c.status === 'archived';
      if (filterStatus === 'active') return matchesSearch && !isArchived;
      if (filterStatus === 'archived') return matchesSearch && isArchived;
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'responses') {
        const countA = responses.filter(r => r.campaignId === a.id).length;
        const countB = responses.filter(r => r.campaignId === b.id).length;
        if (countB !== countA) return countB - countA;
      }
      // default: 'recent' (by createdAt descending)
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

  const handleSelect = (id) => {
    if (isCreatingNew) {
      const confirmLeave = window.confirm("You have unsaved changes in Create/Edit mode. Are you sure you want to leave create mode and view this campaign?");
      if (!confirmLeave) return;
    }

    if (onSelectCampaign) {
      onSelectCampaign(id);
    } else {
      setSelectedCampaignId(id);
    }

    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  const handlePreview = (e, id) => {
    e.stopPropagation();
    if (isCreatingNew) {
      const confirmLeave = window.confirm("You are currently in Create/Edit mode. Leave create mode to run preview test?");
      if (!confirmLeave) return;
    }
    setActiveTestId(id);
    setCurrentView('tester');
    if (onClose) onClose();
  };

  const handleEdit = (e, campaign) => {
    e.stopPropagation();
    if (isCreatingNew) {
      const confirmLeave = window.confirm("You are currently in Create/Edit mode. Switch to editing this campaign?");
      if (!confirmLeave) return;
    }
    if (onEditCampaign) onEditCampaign(campaign);
    if (onClose) onClose();
  };

  const handleArchiveToggle = (e, campaign) => {
    e.stopPropagation();
    if (campaign.status === 'archived') {
      reactivateCampaign(campaign.id);
    } else {
      const confirmArchive = window.confirm(`End and archive "${campaign.title}"? Submissions will be paused.`);
      if (confirmArchive) {
        archiveCampaign(campaign.id);
      }
    }
  };

  const handleDeleteClick = (e, campaign) => {
    e.stopPropagation();
    setCampaignToDelete(campaign);
  };

  const handleConfirmDelete = () => {
    if (campaignToDelete) {
      deleteCampaign(campaignToDelete.id);
      setCampaignToDelete(null);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)', zIndex: 40, display: window.innerWidth < 1024 ? 'block' : 'none' }}
        />
      )}

      {/* Sidebar Panel */}
      <aside 
        className="glass-panel"
        style={{
          width: '280px',
          flexShrink: 0,
          borderRadius: 0,
          borderTop: 'none',
          borderBottom: 'none',
          borderLeft: 'none',
          height: '100vh',
          position: 'sticky',
          top: 0,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          transition: 'transform 0.3s ease',
          background: 'var(--bg-card)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 18px 14px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="#ff5a00" />
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800 }}>Usability Campaigns</h3>
          </div>

          <button 
            onClick={onCreateNew}
            className="btn-gradient" 
            style={{ padding: '6px 10px', fontSize: '0.78rem' }}
            title="Create New Campaign"
          >
            <Plus size={14} /> New
          </button>
        </div>

        {/* Search, Sort & Status Filter */}
        <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <Search size={14} color="var(--text-subtle)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search campaigns..."
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '32px', height: '32px', fontSize: '0.78rem' }}
            />
          </div>

          {/* Sort Selector Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-subtle)', padding: '0 2px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <ArrowUpDown size={12} color="#ff5a00" /> Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'var(--bg-input)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '3px 8px',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="recent">Most Recent</option>
              <option value="responses">Most Responses</option>
            </select>
          </div>

          {/* Status Filter Tabs */}
          <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '2px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setFilterStatus('all')}
              style={{
                flex: 1,
                padding: '4px',
                border: 'none',
                background: filterStatus === 'all' ? 'var(--accent-primary)' : 'transparent',
                color: filterStatus === 'all' ? 'white' : 'var(--text-muted)',
                fontSize: '0.72rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer'
              }}
            >
              All ({campaigns.length})
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              style={{
                flex: 1,
                padding: '4px',
                border: 'none',
                background: filterStatus === 'active' ? 'var(--accent-primary)' : 'transparent',
                color: filterStatus === 'active' ? 'white' : 'var(--text-muted)',
                fontSize: '0.72rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer'
              }}
            >
              Active ({campaigns.filter(c => c.status !== 'archived').length})
            </button>
            <button
              onClick={() => setFilterStatus('archived')}
              style={{
                flex: 1,
                padding: '4px',
                border: 'none',
                background: filterStatus === 'archived' ? 'var(--accent-primary)' : 'transparent',
                color: filterStatus === 'archived' ? 'white' : 'var(--text-muted)',
                fontSize: '0.72rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer'
              }}
            >
              Archived ({campaigns.filter(c => c.status === 'archived').length})
            </button>
          </div>
        </div>

        {/* Campaign List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {processedCampaigns.length === 0 ? (
            <div style={{ padding: '24px 12px', textStyle: 'italic', fontSize: '0.8rem', color: 'var(--text-subtle)', textAlign: 'center' }}>
              No matching campaigns found.
            </div>
          ) : (
            processedCampaigns.map(c => {
              const respCount = responses.filter(r => r.campaignId === c.id).length;
              const isSelected = c.id === selectedCampaignId && !isCreatingNew;
              const isArchived = c.status === 'archived';

              return (
                <div
                  key={c.id}
                  onClick={() => handleSelect(c.id)}
                  className="glass-card"
                  style={{
                    padding: '12px 14px',
                    cursor: 'pointer',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    background: isSelected ? 'rgba(37, 99, 235, 0.18)' : 'rgba(30, 41, 59, 0.3)',
                    opacity: isArchived ? 0.75 : 1,
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--accent-orange)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                        {c.id}
                      </span>
                      {isArchived && (
                        <span className="badge badge-amber" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                          Archived
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button 
                        onClick={(e) => handleArchiveToggle(e, c)}
                        style={{ background: 'transparent', border: 'none', color: isArchived ? '#34d399' : '#f59e0b', cursor: 'pointer', padding: '2px' }}
                        title={isArchived ? "Reactivate" : "Archive"}
                      >
                        {isArchived ? <RotateCcw size={13} /> : <Archive size={13} />}
                      </button>
                      <button 
                        onClick={(e) => handleEdit(e, c)}
                        style={{ background: 'transparent', border: 'none', color: '#ff5a00', cursor: 'pointer', padding: '2px' }}
                        title="Edit Campaign"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button 
                        onClick={(e) => handleDeleteClick(e, c)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer', padding: '2px' }}
                        title="Delete Campaign"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: '2px 0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {c.title}
                  </h4>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <span className="badge badge-orange" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                      {respCount} {respCount === 1 ? 'Response' : 'Responses'}
                    </span>

                    <button
                      onClick={(e) => handlePreview(e, c.id)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
                    >
                      Test <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 18px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.75rem', color: 'var(--text-subtle)', textAlign: 'center' }}>
          UXPulse Usability Testing Hub
        </div>

      </aside>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal 
        isOpen={Boolean(campaignToDelete)}
        campaign={campaignToDelete}
        responseCount={campaignToDelete ? responses.filter(r => r.campaignId === campaignToDelete.id).length : 0}
        onConfirm={handleConfirmDelete}
        onCancel={() => setCampaignToDelete(null)}
      />
    </>
  );
};
