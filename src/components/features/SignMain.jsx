import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSidebar } from '@/context/SidebarContext'
import "@/styles/feature/_mainsign.scss";

// reusable components
import Sidebar from "./Sidebar";
import Signing from './sign/Signing'

// feature
import "@/styles/feature/_mainsign.scss";

const SignMain = () => {
    const { isCollapsed } = useSidebar();

  return (
    <>
        <Sidebar />
        <main className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
            <Signing />
        </main>
    </>
  )
}

export default SignMain