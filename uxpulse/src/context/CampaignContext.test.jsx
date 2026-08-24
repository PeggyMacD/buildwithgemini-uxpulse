import { describe, it, expect, beforeEach } from 'vitest';
import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { CampaignProvider, useCampaigns } from './CampaignContext';

// Each test starts from the shipped mock data, not whatever a previous test left behind.
beforeEach(() => {
  localStorage.clear();
});

const setup = () => renderHook(() => useCampaigns(), { wrapper: CampaignProvider });

describe('CampaignContext', () => {
  it('deletes a campaign and its responses together', () => {
    const { result } = setup();
    const target = result.current.campaigns[0].id;

    expect(result.current.responses.some(r => r.campaignId === target)).toBe(true);

    act(() => result.current.deleteCampaign(target));

    expect(result.current.campaigns.some(c => c.id === target)).toBe(false);
    expect(result.current.responses.some(r => r.campaignId === target)).toBe(false);
  });

  it('adds a new campaign to the top of the list and marks it active', () => {
    const { result } = setup();
    const before = result.current.campaigns.length;

    act(() => result.current.addCampaign({ title: 'Checkout flow test' }));

    expect(result.current.campaigns).toHaveLength(before + 1);
    expect(result.current.campaigns[0].title).toBe('Checkout flow test');
    expect(result.current.campaigns[0].status).toBe('active');
  });

  it('builds a shareable link that points at the campaign', () => {
    const { result } = setup();

    expect(result.current.getShareableUrl('camp-001')).toContain('?test=camp-001');
  });
});
