import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/_landing.scss";
import logo from "../assets/images/solvistalogo.png";
import profile from "../assets/images/hikaru.jpg";
import { FaFilePdf, FaFileSignature } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Landing = () => {
  const { card, useCard } = useState();
  const navigate = useNavigate();
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
      title: "Document Upload",
      description: "Upload your documents to the platform",
      button: "Upload",
      onClick: () => {
        navigate("/document-upload");
      },
    },
  ];

  return (
    <section className="landing-container">
      <Nav />

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
