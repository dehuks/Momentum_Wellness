import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import CageQuestionnaire from './pages/CageQuestionnaire';
import Phq9Questionnaire from './pages/Phq9Questionnaire';
import AnxietyQuestionnaire from './pages/AnxietyQuestionnaire';
import BurnoutQuestionnaire from './pages/BurnoutQuestionnaire';


const App = () => {
  console.log("App is rendering");

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cage" element={<CageQuestionnaire />} />
            <Route path="/phq9" element={<Phq9Questionnaire />} />
            <Route path="/anxiety" element={<AnxietyQuestionnaire />} />
            <Route path="/burnout" element={<BurnoutQuestionnaire />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
