import React from 'react';
import { Hero } from '../components/home/Hero';
import { DashboardPreview } from '../components/home/DashboardPreview';
import { TrustBar } from '../components/home/TrustBar';
import { SecurityOverview } from '../components/home/SecurityOverview';
import { CapabilityGrid } from '../components/home/CapabilityGrid';
import { Workflow } from '../components/home/Workflow';
import { RiskAnalytics } from '../components/home/RiskAnalytics';
import { VulnerabilityIntelligence } from '../components/home/VulnerabilityIntelligence';
import { ReportPreview } from '../components/home/ReportPreview';
import { FinalCTA } from '../components/home/FinalCTA';

export const Home: React.FC = () => {
  return (
    <div className="relative">
      <Hero />
      <DashboardPreview />
      <TrustBar />
      <SecurityOverview />
      <CapabilityGrid />
      <Workflow />
      <RiskAnalytics />
      <VulnerabilityIntelligence />
      <ReportPreview />
      <FinalCTA />
    </div>
  );
};
