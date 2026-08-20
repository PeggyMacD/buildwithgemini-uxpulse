import React, { useState } from 'react';
import { CampaignProvider, useCampaigns } from './context/CampaignContext';
import { Navigation } from './components/Navigation';
import { Sidebar } from './components/Sidebar';
import { ActiveCampaignView } from './components/admin/ActiveCampaignView';
import { CampaignBuilder } from './components/admin/CampaignBuilder';

import { WelcomeScreen } from './components/tester/WelcomeScreen';
import { TestRunner } from './components/tester/TestRunner';
import { FeedbackSurvey } from './components/tester/FeedbackSurvey';
import { ThankYouScreen } from './components/tester/ThankYouScreen';

const MainApp = () => {
  const { currentView, setSelectedCampaignId } = useCampaigns();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);

  // Tester Flow state
  const [testerStep, setTesterStep] = useState('welcome'); // 'welcome' | 'tasks' | 'survey' | 'thankyou'
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [taskStatuses, setTaskStatuses] = useState([]);

  const handleStartTest = () => {
    setTesterStep('tasks');
  };

  const handleFinishTasks = (duration) => {
    setElapsedSeconds(duration);
    setTesterStep('survey');
  };

  const handleSubmitSuccess = () => {
    setTesterStep('thankyou');
  };

  const handleStartCreateNew = () => {
    setEditingCampaign(null);
    setIsCreatingNew(true);
  };

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setIsCreatingNew(true);
  };

  const handleSelectCampaignFromSidebar = (id) => {
    setSelectedCampaignId(id);
    setIsCreatingNew(false);
    setEditingCampaign(null);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header Bar: Logo, Create CTA, Theme Toggle, Profile Menu */}
      <Navigation 
        onToggleSidebar={() => setSidebarOpen(prev => !prev)}
        onCreateNew={handleStartCreateNew}
      />

      {currentView === 'admin' ? (
        <div style={{ display: 'flex', flex: 1 }}>
          
          {/* Left Drawer / Sidebar */}
          {sidebarOpen && (
            <Sidebar 
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              onCreateNew={handleStartCreateNew}
              onEditCampaign={handleEditCampaign}
              isCreatingNew={isCreatingNew}
              onSelectCampaign={handleSelectCampaignFromSidebar}
            />
          )}

          {/* Main Dashboard Area */}
          <main style={{ flex: 1, paddingTop: '20px' }}>
            {isCreatingNew ? (
              <CampaignBuilder 
                campaignToEdit={editingCampaign}
                onSaved={() => {
                  setIsCreatingNew(false);
                  setEditingCampaign(null);
                }}
                onCancel={() => {
                  setIsCreatingNew(false);
                  setEditingCampaign(null);
                }}
              />
            ) : (
              <ActiveCampaignView />
            )}
          </main>

        </div>
      ) : (
        <main style={{ flex: 1 }}>
          {testerStep === 'welcome' && <WelcomeScreen onStart={handleStartTest} />}
          {testerStep === 'tasks' && (
            <TestRunner 
              onFinishTasks={handleFinishTasks}
              taskStatuses={taskStatuses}
              setTaskStatuses={setTaskStatuses}
            />
          )}
          {testerStep === 'survey' && (
            <FeedbackSurvey 
              elapsedSeconds={elapsedSeconds}
              taskStatuses={taskStatuses}
              onSubmitSuccess={handleSubmitSuccess}
            />
          )}
          {testerStep === 'thankyou' && <ThankYouScreen />}
        </main>
      )}

    </div>
  );
};

export default function App() {
  return (
    <CampaignProvider>
      <MainApp />
    </CampaignProvider>
  );
}
