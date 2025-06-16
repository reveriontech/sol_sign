import React, { useState } from "react";
import "../styles/pages/_landing.scss";
import logo from "../assets/images/solvistalogo.png";
import profile from "../assets/images/hikaru.jpg";
import { FaFilePdf } from "react-icons/fa";

const Landing = () => {
  const { card, useCard } = useState();

  const cards = [
    {
      icon: <FaFilePdf />,
      title: "Upload",
      description: "Upload your documents to the platform",
      button: "Upload",
      onClick: () => {
        console.log("Upload");
      },
    },
    {
      icon: <FaFilePdf />,
      title: "Upload",
      description: "Upload your documents to the platform",
      button: "Upload",
      onClick: () => {
        console.log("Upload");
      },
    },
    {
      icon: <FaFilePdf />,
      title: "Upload",
      description: "Upload your documents to the platform",
      button: "Upload",
      onClick: () => {
        console.log("Upload");
      },
    },
  ];

  return (
    <section className="landing-container">
      <nav>
        <img src={logo} alt="Sol Vista DocSign" />

        <div className="profile">
          <img className="profile-image" src={profile} alt="Hikaru" />
          <p>Hikaru</p>
        </div>
      </nav>

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

              {/* This is for button */}
              <div className="card-button">
                <button>{card.button}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Landing;
