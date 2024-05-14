import { useNavigate } from "react-router-dom";
const LogoutButton = () => {
  const navigateTo = useNavigate();
  const handleLogout = () => {
    // Clear user information from session
    sessionStorage.clear();

    // You can also perform additional logout actions here, such as redirecting to a login page
    navigateTo("/welcome");
    // or making a request to your server to invalidate the session.
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
