
import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  // React.ReactNode is a TypeScript type that represents anything that can be rendered by React. This includes:
  return (
    <main className="root">
      {/* Sidebar */}
      <Sidebar/>
      {/* mobile navbar */}
      <MobileNav/>
      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
}

export default Layout;
