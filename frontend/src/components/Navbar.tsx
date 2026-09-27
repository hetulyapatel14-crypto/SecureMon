import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Platform', path: '/dashboard' },
    { name: 'Assessments', path: '/assessments' },
    { name: 'Findings', path: '/findings' },
    { name: 'Reports', path: '/reports' },
    { name: 'Security Lab', path: '/lab' },
    { name: 'Architecture', path: '/architecture' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b-2 border-pop-border shadow-[0_4px_0px_#1E293B]'
          : 'bg-canvas border-b-2 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with Tactile Circle Icon */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-brand-violet border-2 border-pop-border shadow-[3px_3px_0px_#1E293B] group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0px_#1E293B] transition-all">
            <ShieldCheck className="w-6 h-6 text-white" strokeWidth={2.5} />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-brand-amber border-2 border-pop-border shadow-[1px_1px_0px_#1E293B]" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-ink font-heading flex items-center gap-2">
              SECUREMON
              <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-brand-pink text-ink border-2 border-pop-border shadow-[1px_1px_0px_#1E293B]">
                SIH26163
              </span>
            </span>
            <span className="text-[11px] text-ink-muted font-medium -mt-0.5">
              Authorized Assessment Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border-2 border-pop-border shadow-[3px_3px_0px_#1E293B]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs font-heading font-bold px-3.5 py-1.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-brand-violet text-white shadow-[2px_2px_0px_#1E293B]'
                    : 'text-ink-muted hover:text-ink hover:bg-slate-100'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/login"
            className="text-xs font-heading font-bold text-ink hover:text-brand-violet transition-colors px-3 py-2"
          >
            Sign In
          </Link>
          <Link
            to="/assessments"
            className="btn-candy text-xs sm:text-sm group"
          >
            <span>Start Assessment</span>
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-brand-violet group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={3} />
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white border-2 border-pop-border shadow-[2px_2px_0px_#1E293B] text-ink"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={2.5} /> : <Menu className="w-6 h-6" strokeWidth={2.5} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b-2 border-pop-border px-4 pt-3 pb-6 space-y-3 shadow-pop">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-heading font-bold text-ink hover:text-brand-violet"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2 text-sm font-heading font-bold text-ink"
            >
              Sign In
            </Link>
            <Link
              to="/assessments"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-candy text-center text-sm py-2.5"
            >
              Start Assessment →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
