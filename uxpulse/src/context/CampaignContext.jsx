import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCampaigns, initialResponses } from '../data/mockData';

const CampaignContext = createContext();

export const CampaignProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('uxpulse_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('uxpulse_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Load initial or persisted state
  const [campaigns, setCampaigns] = useState(() => {
    const saved = localStorage.getItem('uxpulse_campaigns');
    if (!saved) return initialCampaigns;
    try {
      const parsed = JSON.parse(saved);
      const existingIds = new Set(parsed.map(c => c.id));
      const missing = initialCampaigns.filter(c => !existingIds.has(c.id));
      return missing.length > 0 ? [...parsed, ...missing] : parsed;
    } catch {
      return initialCampaigns;
    }
  });

  const [responses, setResponses] = useState(() => {
    const saved = localStorage.getItem('uxpulse_responses');
    if (!saved) return initialResponses;
    try {
      const parsed = JSON.parse(saved);
      const existingIds = new Set(parsed.map(r => r.id));
      const missing = initialResponses.filter(r => !existingIds.has(r.id));
      return missing.length > 0 ? [...parsed, ...missing] : parsed;
    } catch {
      return initialResponses;
    }
  });

  const [selectedCampaignId, setSelectedCampaignId] = useState(campaigns[0]?.id || 'camp-001');
  const [currentView, setCurrentView] = useState('admin'); // 'admin' | 'tester'
  const [activeTestId, setActiveTestId] = useState(campaigns[0]?.id || 'camp-001');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('uxpulse_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('uxpulse_responses', JSON.stringify(responses));
  }, [responses]);

  // Check URL query parameters for test links on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const testParam = params.get('test');
    if (testParam) {
      const match = campaigns.find(c => c.id === testParam);
      if (match) {
        setActiveTestId(match.id);
        setCurrentView('tester');
      }
    }
  }, [campaigns]);

  const addCampaign = (newCamp) => {
    const campWithId = {
      ...newCamp,
      id: `camp-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    setCampaigns(prev => [campWithId, ...prev]);
    setSelectedCampaignId(campWithId.id);
    return campWithId;
  };

  const updateCampaign = (updatedCamp) => {
    setCampaigns(prev => prev.map(c => c.id === updatedCamp.id ? { ...c, ...updatedCamp } : c));
    return updatedCamp;
  };

  const archiveCampaign = (id) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: 'archived' } : c));
  };

  const reactivateCampaign = (id) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: 'active' } : c));
  };

  const deleteCampaign = (id) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    setResponses(prev => prev.filter(r => r.campaignId !== id));
    if (selectedCampaignId === id) {
      const remaining = campaigns.filter(c => c.id !== id);
      if (remaining.length > 0) setSelectedCampaignId(remaining[0].id);
    }
  };

  const submitResponse = (newResponse) => {
    const fullResponse = {
      ...newResponse,
      id: `resp-${Date.now().toString().slice(-4)}`,
      completedAt: new Date().toISOString()
    };
    setResponses(prev => [fullResponse, ...prev]);
    return fullResponse;
  };

  const getShareableUrl = (campId) => {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?test=${campId}`;
  };

  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId) || campaigns[0];
  const activeTestCampaign = campaigns.find(c => c.id === activeTestId) || campaigns[0];
  const campaignResponses = responses.filter(r => r.campaignId === selectedCampaignId);

  return (
    <CampaignContext.Provider
      value={{
        theme,
        toggleTheme,
        campaigns,
        responses,
        selectedCampaignId,
        setSelectedCampaignId,
        selectedCampaign,
        activeTestId,
        setActiveTestId,
        activeTestCampaign,
        campaignResponses,
        currentView,
        setCurrentView,
        addCampaign,
        updateCampaign,
        archiveCampaign,
        reactivateCampaign,
        deleteCampaign,
        submitResponse,
        getShareableUrl
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaigns = () => useContext(CampaignContext);
