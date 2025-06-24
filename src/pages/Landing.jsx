import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectRecentlySent } from "@/store/selectors";
import "../styles/pages/_landing.scss";
import { FaFilePdf, FaFileSignature } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { card, useCard } = useState();
  const navigate = useNavigate();
  const recentlySent = useSelector(selectRecentlySent);
  
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
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section className="landing-container">
      {/* Recently left sidebar */}
      <section className="recently-left-sidebar">
         <div>
            <h2>Recently Sent</h2>
            {recentlySent.length === 0 ? (
              <p className="no-recent">No documents sent yet</p>
             ) : (
              recentlySent.map((item, index) => (
                <div 
                  key={item.id || index} 
                  className="recent-item"
                  onClick={() => navigate("/signmain")}
                  style={{ cursor: 'pointer' }}
                >
                  <h3>{item.subject}</h3>
                  <p className="recent-details">
                    {item.recipientCount} recipient{item.recipientCount !== 1 ? 's' : ''} • {item.fileCount} file{item.fileCount !== 1 ? 's' : ''}
                  </p>
                  <p className="recent-date">{formatDate(item.date)}</p>
                </div>
              ))
            )}
         </div>
      </section>

      <div className="landing-content">
        <div className="landing-content-text">
          <h1>Digital Signatures</h1>
          <p>
            Choose how you'd like to get started with secure, legally binding
            electronic signatures
          </p>
        </div>

        {/* This is for cards */}

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
    </section>
  );
};

export default Landing;
