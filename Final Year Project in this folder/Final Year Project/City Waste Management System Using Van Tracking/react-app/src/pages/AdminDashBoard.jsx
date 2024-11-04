import { useEffect, useState } from "react";
import LocationPicker from "./LocationPicker";
import LogoutButton from "./LogoutButton";
useEffect;
useState;
const AdminDashBoard = () => {
  let [activeNum, change] = useState(1);
  let handleLink = (num) => {
    change(num);
  };

  return (
    <div>
      <header>
        <h1>Admin Dashboard</h1>
      </header>
      <NavComop
        activeLink={activeNum}
        handleLink={handleLink}
        val={["Profile", "Locate", "Tasks"]}
      />
      {activeNum == 1 ? <ProfileComp /> : null}
      {activeNum == 2 ? <Locate /> : null}
      {activeNum == 3 ? <Tasks /> : null}
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
      <main className="adminProfileMain">
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
        <div className="change-password-form forms">
          <h2>Add or Delete van</h2>

          <label htmlFor="serialNumber">Serial Number:</label>
          <input type="text" id="serialNumber" name="serialNumber" required />

          <button className="btnSubmit">Add</button>
          <button className="btnSubmit">Delete</button>
        </div>
      </main>
    </>
  );
}

function Locate() {
  function TrackVan() {
    useEffect(() => {
      // Function to initialize the map
      const initMap = () => {
        // Set the default location to a specific latitude and longitude
        const defaultLocation = { lat: 40.7128, lng: -74.006 };

        // Create a map centered at the default location
        const map = new window.google.maps.Map(document.getElementById("map"), {
          zoom: 12,
          center: defaultLocation,
        });

        // Add a marker at the default location
        new window.google.maps.Marker({
          position: defaultLocation,
          map: map,
          title: "Van Location",
        });
      };

      // Load the Google Maps API script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.defer = true;
      script.async = true;

      document.head.appendChild(script);

      return () => {
        // Clean up the script tag on component unmount
        document.head.removeChild(script);
      };
    }, []); // Empty dependency array ensures the effect runs only once

    return (
      <>
        <main>
          <div
          
            id="map"
            style={{
              height: "400px",
              width: "100%",
              border: "1px  #ccc",
            
            }}
          >
          <LocationPicker/>

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
function Tasks() {
  return (
    <>
      <main>
        <div className="dashboard-item">
          <h2>Complain History</h2>
          <ul className="complaints-list">
            <li className="complaint">
            <strong>Phone:</strong> 1231231
              <br />
              <strong>Issue:</strong> Van is not on time
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
export default AdminDashBoard;
