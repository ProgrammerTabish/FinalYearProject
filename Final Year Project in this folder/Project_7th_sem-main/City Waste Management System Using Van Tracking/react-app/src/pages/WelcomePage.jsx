import React, { useState } from "react";
import "./styles.css";
import LoginSection from "./components/LoginSection";

const WelcomePage = () => {
  return (
    <div>
      <header>
        <h1>Welcome to the City Garbage manager</h1>
      </header>

      <main>
        <LoginSection
          title="Citizen"
          name="citizenUsername"
          id="citizenUsername"
        />
        <LoginSection title="Van" name="citizenUsername" id="citizenUsername" />
        <LoginSection
          title="Admin"
          name="citizenUsername"
          id="citizenUsername"
        />
      </main>

      <footer>
        <p>&copy; 2023 System Login</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
