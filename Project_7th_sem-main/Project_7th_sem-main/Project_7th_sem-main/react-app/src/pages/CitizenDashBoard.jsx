import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";


import LogoutButton from "./LogoutButton";
import LocationPicker from "./LocationPicker";
import MyMap from "./MyMap";
useEffect;
useState;
const CitizenDashBoard = () => {
  let [activeNum, change] = useState(1);
  let handleLink = (num) => {
    change(num);
  };

  return (
    <div>
      <header>
        <h1>Citizen Dashboard</h1>
      </header>
      <NavComop
        activeLink={activeNum}
        handleLink={handleLink}
        val={["Profile", "Complains", "History"]}
      />
      {activeNum == 1 ? <ProfileComp /> : null}
      {activeNum == 2 ? <ComplainsComp /> : null}
      {activeNum == 3 ? <HistoryComp /> : null}
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
        </a>{" "}
        <LogoutButton />
      </nav>{" "}
    </>
  );
}

function ProfileComp() {
  return (
    <>
      <main>
        <div id="tracker-number">
          Phone Number: {JSON.parse(sessionStorage.user).phone} (
          {JSON.parse(sessionStorage.user).title})
        </div>

        <ChangePasswordForm />
      </main>
    </>
  );
}

function ChangePasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      console.error("Passwords do not match");
      return;
    }

    try {
      // Make an API call to update the password
      let title = JSON.parse(sessionStorage.user).title;
      let phone = JSON.parse(sessionStorage.user).phone;
      await axios.post("http://localhost:3001/change-password", {
        title,
        phone,
        newPassword,
      });

      // Optionally, you can handle success (e.g., show a success message)
      alert("Password changed successfully");
    } catch (error) {
      // Handle error (e.g., show an error message)

      console.error("Error changing password:", error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

function ComplainsComp() {
  let [options, changeOption] = useState(0);
  let HandleChange = (val) => {
    changeOption(val);
  };
  function FileComplain() {
    const [selectedLocation, setSelectedLocation] = useState([0, 0]);
    useEffect(() => {
      console.log(selectedLocation);
    });
    let phone = JSON.parse(sessionStorage.user).phone;
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("submitted", {
        name: e.target.name.value,
        location: selectedLocation,
        complaint: e.target.complaint.value,
      });
      
      // Logic to send the complaint data to your server
      try {
        const response = await axios.post('http://localhost:3001/complaints', {
          name: e.target.name.value,
          location: selectedLocation,
          complaint: e.target.complaint.value,
        });
        e.target.reset();
        console.log('Complaint submitted successfully:', response.data);
    } catch (error) {
        console.error('Error submitting complaint:', error);
    }
         

    };

    return (
      <>
        <section className="min-h-screen flex items-center justify-center p-6">
          <form
            className="max-w-screen-md w-full bg-white p-8 rounded-md shadow-md"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Your Phone:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={phone}
              readOnly
              required
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 bg-gray-200"
            />

            <div className="p-2 m-7">
              <label className="p-2 m-2"> Pick a location on the map :</label>
              <div className="md:w-96 w-1/2">
                <MyMap setCordinates={setSelectedLocation} />
              </div>
              <label className="p-2 m-2">
                GPS co-ordinates: {selectedLocation[0]},{selectedLocation[1]}
              </label>
            </div>
            <label
              htmlFor="complaint"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Complaint Details:
            </label>
            <textarea
              id="complaint"
              name="complaint"
              rows="4"
              required
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            ></textarea>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Submit Complaint
            </button>
          </form>
        </section>
      </>
    );
  }

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
        <div className="min-h-screen bg-gray-100">
          <div className="flex">
            {/* Map Section (70% of the screen) */}
            <div className="w-70vw h-screen z-4"></div>
            <LocationPicker />
            {/* Van Details Section (30% of the screen) */}
            <div className="w-30vw p-4 bg-white rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Van Details</h2>
              {/* Replace with actual van details or coordinates display */}
              <div>
                <p>Latitude: 40.7128</p>
                <p>Longitude: -74.0060</p>
                <p>Last Update: 2023-11-14 12:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <button
        className="complainButton"
        style={{ textDecoration: options === 0 ? "underline" : "none" }}
        onClick={() => HandleChange(0)}
      >
        + File Complain
      </button>
      <button
        className="complainButton"
        style={{ textDecoration: options === 1 ? "underline" : "none" }}
        onClick={() => HandleChange(1)}
      >
        Track Grabage Van
      </button>
      {options == 0 ? <FileComplain /> : null}
      {options == 1 ? <TrackVan /> : null}
    </>
  );
}
function HistoryComp() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
      // Fetch complaints from the backend
      const fetchComplaints = async () => {
          try {
            let phone= JSON.parse(sessionStorage.user).phone;
              const response = await axios.get(`http://localhost:3001/complaints/${phone}`);
              setComplaints(response.data);
          } catch (error) {
              console.error('Error fetching complaints:', error);
          }
      };

      

      fetchComplaints();
  }, []);
  const handleRevoke = async (complaintId) => {
  console.log("revoking id...", complaintId);
  let phone= JSON.parse(sessionStorage.user).phone;
    try {
        await axios.delete(`http://localhost:3001/complaints/${complaintId}`);
        // Refresh the complaints list or update state as needed
        const response = await axios.get(`http://localhost:3001/complaints/${phone}`);
        setComplaints(response.data);
       
    } catch (error) {
        console.error('Error revoking complaint:', error);
    }
};
  return (
      <>
          <main>
              <div className="dashboard-item">
                  <h2>Complain History:</h2>
                  <ul className="complaints-list">
                      {complaints.map((complaint, index) => (
                          <li key={index} className="complaint">
                              <strong>Issue:</strong> {complaint.complaint}
                              <br />
                              <strong>Co-ordinates:</strong> {complaint.location.join(', ')}
                              <br />
                              <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleRevoke(complaint._id)} // Assuming _id is the complaint ID
        >
            Revoke
        </button>
                          </li>
                      ))}
                  </ul>
              </div>
          </main>
      </>
  );
}
export default CitizenDashBoard;
