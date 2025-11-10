// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import LoanCalculator from './pages/LoanCalculator';
import ApplyLoan from './pages/ApplyLoan';
import LoanStatus from './pages/LoanStatus';
import LoanOffers from './pages/LoanOffers';
import Contact from './pages/Contact';
import AdminPanel from './components/AdminPanel';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Admin route without Header & Footer */}
          <Route path="/admin" element={<AdminPanel />} />
          
          {/* All other routes with Header & Footer */}
          <Route path="*" element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/calculator" element={<LoanCalculator />} />
                  <Route path="/apply-loan" element={<ApplyLoan />} />
                  <Route path="/loan-status" element={<LoanStatus />} />
                  <Route path="/offers" element={<LoanOffers />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;