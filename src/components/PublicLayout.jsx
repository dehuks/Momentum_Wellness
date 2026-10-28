import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// The router keeps the previous page's scroll position, so new pages would open
// part-way down. Jump to the top on every route change ('instant' bypasses the
// global smooth scrolling so the page doesn't visibly glide up).
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const PublicLayout = () => (
  <div className="flex flex-col min-h-screen bg-[var(--light-bg)]">
    <ScrollToTop />
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default PublicLayout;
