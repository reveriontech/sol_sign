import React, { useState, useEffect } from "react";
import "@/styles/feature/_sidebar.scss";
import { useSidebar } from "@/context/SidebarContext";
import logoPicture from "@/assets/images/solvistalogo.png";
import { CiAlignRight, CiAlignLeft } from "react-icons/ci";
import Button from "@/reusable/Button";
import Modal from "@/reusable/Modal";

// icons
import { BsXCircleFill } from "react-icons/bs";
import { FaSignature } from "react-icons/fa";
import { AiFillSignature } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { MdOutlineTextFields } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { MdEmail } from "react-icons/md";


const Sidebar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    isCollapsed,
    isMobileOpen,
    isMobile,
    closeMobileSidebar,
    toggleSidebar,
  } = useSidebar();
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkTablet = () => {
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      setIsTablet(tablet);
    };

    checkTablet();
    window.addEventListener("resize", checkTablet);

    return () => window.removeEventListener("resize", checkTablet);
  }, []);

  const handleCloseClick = () => {
    if (isMobile) {
      closeMobileSidebar();
    } else if (isTablet) {
      toggleSidebar();
    }
  };

  const handleOpenClick = () => {
    if (isMobile) {
      toggleSidebar();
    } else if (isTablet) {
      toggleSidebar();
    }
  };

  // Temporary recipients
  const recipients = [
    {
      id: 1,
      email: "john.doe@example.com",
    },
    {
      id: 2,
      email: "jane.doe@example.com",
    },
    {
      id: 3,
      email: "jim.beam@example.com",
    },
  ];

  return (
    <>
      {isMobile && isMobileOpen && (
        <div className="mobile-overlay" onClick={closeMobileSidebar} />
      )}

      <section
        className={`sidebar${isCollapsed ? " collapsed" : ""}${isMobileOpen ? " mobile-open" : ""}`}
      >
        <div className="sidebar-header">
          <button
            className={isCollapsed ? "mobile-open-button" : "mobile-close-button"}
            onClick={isMobile ? handleOpenClick : toggleSidebar}
            aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
          >
            {isCollapsed ? <CiAlignRight size={32} /> : <CiAlignLeft size={32} />}
          </button>

          {/* Solvista Logo */}
          <div className="sidebar-header-logo">
            {!isCollapsed && !isMobile && (
              <>
                <img
                  src={logoPicture}
                  alt="logo"
                  className="sidebar-header-logo-image"
                />
                <span />
              </>
            )}
            {(isCollapsed || (isTablet && isCollapsed)) && !isMobileOpen && null}
            {isMobile && isMobileOpen && (
              <>
                <img
                  src={logoPicture}
                  alt="logo"
                  className="sidebar-header-logo-image"
                />
              </>
            )}
          </div>
        </div>

        {/* This is the main content of the sidebar */}
        <div className="sidebar-main-content">
          <p className="sidebar-main-content-title">Signature Fields</p>

          <div className="main-fields">
            {/* For Signature */}
            <div className="main-fields-button-container">
              <Button
                onClick={() => setModalOpen(true)}
                variant="outline"
                size="small"
                className="main-fields-button"
              >
                <FaSignature />
                <span>Signature</span>
              </Button>
            </div>

            {/* For Initials */}
            <div className="main-fields-button-container">
              <Button
                onClick={() => setModalOpen(true)}
                variant="outline"
                size="small"
                className="main-fields-button"
              >
                <AiFillSignature />
                <span>Initials</span>
              </Button>
            </div>

            {/* Date */}
            <div className="main-fields-button-container">
              <Button
                onClick={() => setModalOpen(true)}
                variant="outline"
                size="small"
                className="main-fields-button"
              >
                <MdDateRange />
                <span>Date</span>
              </Button>
            </div>

            {/* Text input */}
            <div className="main-fields-button-container">
              <Button
                onClick={() => setModalOpen(true)}
                variant="outline"
                size="small"
                className="main-fields-button"
              >
                <MdOutlineTextFields />
                <span>Text</span>
              </Button>
            </div>

            {/* Checkbox */}
            <div className="main-fields-button-container">
              <Button
                onClick={() => setModalOpen(true)}
                variant="outline"
                size="small"
                className="main-fields-button"
              >
                <MdCheckBox />
                <span>Checkbox</span>
              </Button>
            </div>
          </div>

          {/* For Recipients */}
          <div className="recipiant-display-container">
            <p className="recipiant-display-title">Recipients</p>
            <div className="recipiant-display-list">
              {recipients.map(({ id, email }) => (
                <div key={id} className="recipiant-display">
                  <div className="recipiant-display-email">
                    <p className="recipiant-display-email-text">
                      {email}
                    </p>
                    <span>
                      <BsXCircleFill />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Signature */}
      <div>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <p>Signature Modal Content</p>
        </Modal>
      </div>
    </>
  );
};

export default Sidebar;
