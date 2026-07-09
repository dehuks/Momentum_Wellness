import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiGrid, FiUsers, FiFileText, FiImage, FiLogOut, FiExternalLink, FiMenu, FiX } from "react-icons/fi";
import { useBlogAuth } from "../../hooks/useBlogAuth";

const getNavItems = (role) => [
  { to: "/admin/blog", label: "Posts", icon: FiGrid, end: true },
  ...(role === "admin" || role === "editor"
    ? [{ to: "/admin/applications", label: "Applications", icon: FiFileText, end: true }]
    : []),
  ...(role === "admin" ? [{ to: "/admin/site-content", label: "Site Content", icon: FiImage, end: true }] : []),
  ...(role === "admin" ? [{ to: "/admin/blog/users", label: "Users", icon: FiUsers, end: false }] : []),
];

const AdminLayout = () => {
  const { user, logout } = useBlogAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/blog/login", { replace: true });
  };

  const initials = user?.name
    ? user.name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  const SidebarContent = () => (
    <>
      <div className="px-6 py-6 border-b border-white/10">
        <p className="text-white font-bold text-lg tracking-tight leading-tight">MOWET Admin</p>
        <p className="text-[11px] uppercase tracking-widest text-teal-300/80 font-semibold mt-0.5">
          Blog Panel
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {getNavItems(user?.role).map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} onClick={() => setMobileOpen(false)} className={navLinkClass}>
            <Icon className="w-[18px] h-[18px]" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <a
          href="/#/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
        >
          <FiExternalLink className="w-[18px] h-[18px]" />
          View Site
        </a>

        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-teal-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
        >
          <FiLogOut className="w-[18px] h-[18px]" />
          Log Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--light-bg)" }}>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 bg-[#0F172A]">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-30 flex items-center justify-between px-4 h-14 bg-[#0F172A]">
        <p className="text-white font-bold">MOWET Admin</p>
        <button onClick={() => setMobileOpen(true)} className="text-white p-1" aria-label="Open menu">
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile slide-over */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="w-64 flex flex-col bg-[#0F172A]">
            <div className="flex justify-end px-3 pt-3">
              <button onClick={() => setMobileOpen(false)} className="text-white p-1" aria-label="Close menu">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      <main className="flex-1 min-w-0 pt-14 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
