import React, { createContext, useContext, useState, useEffect } from 'react'

const SidebarContext = createContext()

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      const wasMobile = isMobile
      setIsMobile(mobile)
      
      // Close mobile sidebar when switching to desktop
      if (!mobile && wasMobile) {
        setIsMobileOpen(false)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => {
    if (isMobile) {
      // On mobile, toggle open/close
      setIsMobileOpen(prev => !prev)
    } else {
      // On desktop/tablet, toggle collapse
      setIsCollapsed(prev => !prev)
    }
  }

  const closeMobileSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(false)
    }
  }

  return (
    <SidebarContext.Provider value={{ 
      isCollapsed, 
      isMobileOpen, 
      isMobile, 
      toggleSidebar, 
      closeMobileSidebar 
    }}>
      {children}
    </SidebarContext.Provider>
  )
} 