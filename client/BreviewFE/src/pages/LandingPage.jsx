import React from 'react';
import { ArrowRight, CheckCircle2, Globe2, Shield, Users } from 'lucide-react';
import '../styles/LandingPage.css';

const LandingPage = ({ onLoginClick, onRegisterClick }) => {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">
          <Globe2 className="logo-icon" />
          <span>WorldConnect</span>
        </div>
        <div className="nav-buttons">
          <button className="btn-secondary" onClick={onLoginClick}>Log In</button>
          <button className="btn-primary" onClick={onRegisterClick}>Sign Up</button>
        </div>
      </nav>

      <main className="hero-section">
        <div className="hero-content">
          <h1>Connect With The World</h1>
          <p className="hero-subtitle">Join millions of users worldwide and experience a new way of connecting, sharing, and growing together.</p>
          <div className="cta-buttons">
            <button className="btn-primary btn-large" onClick={onRegisterClick}>
              Get Started
              <ArrowRight className="btn-icon" />
            </button>
            <button className="btn-outline btn-large">Learn More</button>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <Shield className="feature-icon" />
            <h3>Secure Platform</h3>
            <p>End-to-end encryption for your privacy and security</p>
          </div>
          <div className="feature-card">
            <Users className="feature-icon" />
            <h3>Global Community</h3>
            <p>Connect with like-minded people from around the world</p>
          </div>
          <div className="feature-card">
            <CheckCircle2 className="feature-icon" />
            <h3>Verified Users</h3>
            <p>Trust and safety with our verification system</p>
          </div>
        </div>
      </main>

      <section className="stats-section">
        <div className="stat-item">
          <h2>10M+</h2>
          <p>Active Users</p>
        </div>
        <div className="stat-item">
          <h2>150+</h2>
          <p>Countries</p>
        </div>
        <div className="stat-item">
          <h2>99.9%</h2>
          <p>Uptime</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;