import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScopeBanner } from './components/ScopeBanner';
import { MouseFollowGlow } from './components/MouseFollowGlow';
import { AppLayout } from './layouts/AppLayout';

// Pages
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Assessments } from './pages/Assessments';
import { Findings } from './pages/Findings';
import { FindingDetail } from './pages/FindingDetail';
import { ApiInventory } from './pages/ApiInventory';
import { HeadersPage } from './pages/HeadersPage';
import { TransportPage } from './pages/TransportPage';
import { CoveragePage } from './pages/CoveragePage';
import { ReportsPage } from './pages/ReportsPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { LabPage } from './pages/LabPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { Login } from './pages/Login';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050608] text-[#F8FAFC] flex flex-col font-sans selection:bg-accent/30 selection:text-white">
        <Routes>
          {/* Public Landing Page */}
          <Route
            path="/"
            element={
              <>
                <MouseFollowGlow />
                <ScopeBanner />
                <Navbar />
                <main className="flex-1">
                  <Home />
                </main>
                <Footer />
              </>
            }
          />

          {/* Login Page */}
          <Route
            path="/login"
            element={
              <>
                <MouseFollowGlow />
                <ScopeBanner />
                <Navbar />
                <main className="flex-1">
                  <Login />
                </main>
                <Footer />
              </>
            }
          />

          {/* Platform In-App Dashboard & Sub-pages */}
          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            }
          />

          <Route
            path="/assessments"
            element={
              <AppLayout>
                <Assessments />
              </AppLayout>
            }
          />

          <Route
            path="/findings"
            element={
              <AppLayout>
                <Findings />
              </AppLayout>
            }
          />

          <Route
            path="/findings/:id"
            element={
              <AppLayout>
                <FindingDetail />
              </AppLayout>
            }
          />

          <Route
            path="/api-inventory"
            element={
              <AppLayout>
                <ApiInventory />
              </AppLayout>
            }
          />

          <Route
            path="/headers"
            element={
              <AppLayout>
                <HeadersPage />
              </AppLayout>
            }
          />

          <Route
            path="/transport"
            element={
              <AppLayout>
                <TransportPage />
              </AppLayout>
            }
          />

          <Route
            path="/coverage"
            element={
              <AppLayout>
                <CoveragePage />
              </AppLayout>
            }
          />

          <Route
            path="/reports"
            element={
              <AppLayout>
                <ReportsPage />
              </AppLayout>
            }
          />

          <Route
            path="/audit-logs"
            element={
              <AppLayout>
                <AuditLogsPage />
              </AppLayout>
            }
          />

          <Route
            path="/lab"
            element={
              <AppLayout>
                <LabPage />
              </AppLayout>
            }
          />

          <Route
            path="/architecture"
            element={
              <AppLayout>
                <ArchitecturePage />
              </AppLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
