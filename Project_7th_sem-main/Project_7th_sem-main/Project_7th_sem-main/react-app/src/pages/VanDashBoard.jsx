import { useEffect, useState } from "react";
import LocationPicker from './LocationPicker'
import LogoutButton from "./LogoutButton";
useEffect;
useState;

const VanDashBoard = () => {
  let [activeNum, change] = useState(1);
  let handleLink = (num) => {
    change(num);
  };

  return (
    <div>
      <header>
        <h1>Van Dashboard</h1>
      </header>
      <NavComop
        activeLink={activeNum}
        handleLink={handleLink}
        val={["Profile", "Locate", "Points"]}
      />
      {activeNum == 1 ? <ProfileComp /> : null}
      {activeNum == 2 ? <LocateComp /> : null}
      {activeNum == 3 ? <Points /> : null}
      <footer>
        <p>&copy; 2023 Change Password Page</p>
      </footer>
    </div>
  );
};

function NavComop({ activeLink, val, handleLink }) {
  return (
    <>
      <nav>
        <a
          style={{ textDecoration: activeLink === 1 ? "underline" : "none" }}
          href="#"
          onClick={() => handleLink(1)}
        >
          {val[0]}
        </a>
        <a
          style={{ textDecoration: activeLink === 2 ? "underline" : "none" }}
          href="#"
          onClick={() => handleLink(2)}
        >
          {val[1]}
        </a>
        <a
          style={{ textDecoration: activeLink === 3 ? "underline" : "none" }}
          href="#"
          onClick={() => handleLink(3)}
        >
          {val[2]}
        </a>
        <LogoutButton/>
      </nav>{" "}
    </>
  );
}

function ProfileComp() {
  return (
    <>
      <main>
        <div id="tracker-number">Phone Number: 8274568191</div>

        <div className="change-password-form">
          <h2>Change Password</h2>
          <form>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              required
            />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />

            <button type="submit">Change Password</button>
          </form>
        </div>
      </main>
    </>
  );
}

function LocateComp() {
  function TrackVan() {
    // Empty dependency array ensures the effect runs only once

    return (
      <>
        <main>
          <div
            id="map"
            style={{
              height: "400px",
              width: "100%",
              border: "1px  #ccc",
              marginBottom: "20px",
            }}
          >


          <LocationPicker/>
          </div>

          <div className="tracking-info p-3">
            <h2><b>Your Location :</b></h2>
            <p>Latitude: 40.7128</p>
            <p>Longitude: -74.0060</p>
            <p>Last Update: 2023-11-14 12:30 PM</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <TrackVan />
    </>
  );
}
function Points() {
  return (
    <>
      <main>
        <div className="dashboard-item">
          <h2>Complain History</h2>
          <ul className="complaints-list">
            <li className="complaint">
              <strong>Phone:</strong> 9140080235
              <br />
              <strong>Issue:</strong> Van is not on time
              <br />
              <strong>Current Points:</strong> 00
              <br />
              <strong>Status:</strong> In Progress
            </li>
            <li className="complaint">
              <strong>Phone:</strong> 9139080235
              <br />
              <strong>Issue:</strong> Van is not on time
              <br />
              <strong>Current Points:</strong> 00
              <br />
              <strong>Status:</strong> In Progress
            </li>
            <li className="complaint">
              <strong>Phone:</strong> 9100080235
              <br />
              <strong>Issue:</strong> Van is not on time
              <br />
              <strong>Current Points:</strong> 00
              <br />
              <strong>Status:</strong> In Progress
            </li>

            {/* Add more complaints as needed */}
          </ul>
        </div>
      </main>
    </>
  );
}
export default VanDashBoard;
