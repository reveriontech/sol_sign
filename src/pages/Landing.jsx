import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectRecentlySent } from "@/store/selectors";
import "../styles/pages/_landing.scss";
import { FaFilePdf, FaFileSignature } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiAlignRight, CiAlignLeft } from "react-icons/ci";
import { useSidebar } from "@/context/SidebarContext";
import { Session } from "../routes/SessionProvider";
import SignOutFunctions from "../functions/SIgnOutFunctions";
import { IoIosLogOut } from "react-icons/io";
import profile from "../assets/images/solvistaicon.png";

const isMobile = () => window.innerWidth <= 767;

const Landing = () => {
  const { card, useCard } = useState();
  const navigate = useNavigate();
  const recentlySent = useSelector(selectRecentlySent);
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const cards = [
    {
      icon: <FaFilePdf />,
      title: "Document Upload",
      description: "Upload your documents to the platform",
      button: "Upload",
      onClick: () => {
        navigate("/upload");
      },
    },
    {
      icon: <FaFileSignature />,
      title: "Smart Signature",
      description: "Upload your documents to the platform",
      button: "Upload",
      onClick: () => {
        navigate("/smart-signature");
      },
    },
    {
      icon: <FaFilePdf />,
      title: "Document",
      description: "Upload your documents to the platform",
      button: "Upload",
      onClick: () => {
        navigate("/signmain");
      },
    },
  ];

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loading, setLoading, user, setUser, userDetails, setUserDetails } =
    Session();

  const { isSigningOut, handleSignOut } = SignOutFunctions();

  // Handle sidebar open/close for mobile
  const handleMobileSidebarToggle = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  // Hide sidebar by default on mobile
  React.useEffect(() => {
    const handleResize = () => {
      if (isMobile()) setMobileSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="landing-container">
      {/* Sidebar Toggle Button */}
      <button
        className={`sidebar-toggle-btn${
          isMobile()
            ? mobileSidebarOpen
              ? " open mobile"
              : " mobile"
            : !isCollapsed
            ? " open"
            : ""
        }`}
        onClick={isMobile() ? handleMobileSidebarToggle : toggleSidebar}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {!isCollapsed ? <CiAlignRight size={32} /> : <CiAlignLeft size={32} />}
      </button>

      {/* Sidebar Overlay for mobile */}
      {isMobile() && mobileSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={handleMobileSidebarToggle}
        ></div>
      )}

      {/* Sidebar */}
      <section
        className={`recently-left-sidebar${
          !isCollapsed ? " show" : " collapsed"
        }${isMobile() && mobileSidebarOpen ? " mobile-open" : ""}`}
        style={
          isMobile() ? { display: mobileSidebarOpen ? "block" : "none" } : {}
        }
      >
        <div className="sidebar-body">
          <div className="sidebar-header">
            <h2>Recently Sent</h2>

            {/* This is for recent items */}
            <div className="recent-items-scroll">
              {recentlySent.length === 0 ? (
                <p className="no-recent">No documents sent yet</p>
              ) : (
                recentlySent.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="recent-item"
                    onClick={() => navigate("/signmain")}
                    style={{ cursor: "pointer" }}
                  >
                    <h3>{item.subject}</h3>
                    <p className="recent-details">
                      {item.recipientCount} recipient
                      {item.recipientCount !== 1 ? "s" : ""} • {item.fileCount}{" "}
                      file
                      {item.fileCount !== 1 ? "s" : ""}
                    </p>
                    <p className="recent-date">{formatDate(item.date)}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* This is for profile */}
          <div className={`profile ${isMenuOpen ? "show" : ""}`}>
            <div className="profile-info">
              <div className="profile-info-container">
                <img
                  className="profile-image"
                  src={
                    user?.session?.user_metadata?.avatar_url ||
                    userDetails?.picture ||
                    profile
                  }
                  alt="Profile"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
                <p>{userDetails?.username?.split("@")[0]}</p>
              </div>

              <button className="logout-btn" onClick={handleSignOut}>
                <IoIosLogOut size={24} />
                <span className="logout-text">
                  {isSigningOut ? "Signing Out" : "Sign Out"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div
        className={`landing-content${isCollapsed ? " sidebar-collapsed" : ""}`}
      >
        <div className="landing-content-text">
          <h1>Digital Signatures</h1>
          <p>
            Choose how you'd like to get started with secure, legally binding
            electronic signatures
          </p>
        </div>

        {/* This Main Cards Content*/}
        <div className="landing-content-cards">
          {cards.map((card, index) => (
            <div key={index} className="cards-container">
              <div className="card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className="card-button">
                <button onClick={card.onClick}>{card.button}</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Recent Items Section */}
      <div className="mobile-recent-section">
        <h2>Recently Sent</h2>
        <div className="mobile-recent-items">
          {recentlySent.length === 0 ? (
            <p className="no-recent">No documents sent yet</p>
          ) : (
            recentlySent.map((item, index) => (
              <div
                key={item.id || index}
                className="recent-item"
                onClick={() => navigate("/signmain")}
                style={{ cursor: "pointer" }}
              >
                <h3>{item.subject}</h3>
                <p className="recent-details">
                  {item.recipientCount} recipient
                  {item.recipientCount !== 1 ? "s" : ""} • {item.fileCount} file
                  {item.fileCount !== 1 ? "s" : ""}
                </p>
                <p className="recent-date">{formatDate(item.date)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Landing;
