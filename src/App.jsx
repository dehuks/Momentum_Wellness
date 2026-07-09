import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import CageQuestionnaire from './pages/CageQuestionnaire';
import Phq9Questionnaire from './pages/Phq9Questionnaire';
import AnxietyQuestionnaire from './pages/AnxietyQuestionnaire';
import BurnoutQuestionnaire from './pages/BurnoutQuestionnaire';
import Careers from './pages/Careers';
import AdminDashboard from './pages/AdminDashboard';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import BlogLogin from './pages/admin/BlogLogin';
import BlogDashboard from './pages/admin/BlogDashboard';
import BlogEditor from './pages/admin/BlogEditor';
import BlogUsers from './pages/admin/BlogUsers';
import SiteContent from './pages/admin/SiteContent';
import BlogProtectedRoute from './components/BlogProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import { BlogAuthProvider } from './context/BlogAuthContext';

const App = () => {
  return (
    <Router>
      <BlogAuthProvider>
        <Routes>
          {/* Public marketing site - Header + Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:key" element={<ServiceDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/cage" element={<CageQuestionnaire />} />
            <Route path="/phq9" element={<Phq9Questionnaire />} />
            <Route path="/anxiety" element={<AnxietyQuestionnaire />} />
            <Route path="/burnout" element={<BurnoutQuestionnaire />} />
          </Route>

          {/* Unified admin panel - its own sidebar shell, no site Header/Footer */}
          <Route path="/admin/blog/login" element={<BlogLogin />} />
          <Route element={
            <BlogProtectedRoute>
              <AdminLayout />
            </BlogProtectedRoute>
          }>
            <Route path="/admin/blog" element={<BlogDashboard />} />
            <Route path="/admin/blog/new" element={<BlogEditor />} />
            <Route path="/admin/blog/:id/edit" element={<BlogEditor />} />
            <Route path="/admin/blog/users" element={
              <BlogProtectedRoute roles={["admin"]}>
                <BlogUsers />
              </BlogProtectedRoute>
            } />
            <Route path="/admin/applications" element={
              <BlogProtectedRoute roles={["admin", "editor"]}>
                <AdminDashboard />
              </BlogProtectedRoute>
            } />
            <Route path="/admin/site-content" element={
              <BlogProtectedRoute roles={["admin"]}>
                <SiteContent />
              </BlogProtectedRoute>
            } />
          </Route>
        </Routes>
      </BlogAuthProvider>
    </Router>
  );
};

export default App;
