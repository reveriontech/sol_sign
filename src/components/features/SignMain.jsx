import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSidebar } from '@/context/SidebarContext'

// reusable components
import Sidebar from "@/reusable/Sidebar";
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