import React from "react";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();

  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    profileImage: "https://via.placeholder.com/120", // Replace with real image
    joined: "January 15, 2023",
  };

  // ✅ Logout function: Clears session, refreshes page, and navigates to home
  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Clear any stored auth tokens
    sessionStorage.clear(); // Clear session storage
    navigate("/"); // Redirect to home
    window.location.reload(); // Refresh the page
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        {/* Profile Icon as Heading */}
        <i className="fa-solid fa-user-circle" style={styles.profileIcon}></i>

        {/* Profile Image */}
        <img src={user.profileImage} alt="Profile" style={styles.profileImage} />

        {/* User Details */}
        <h2 style={styles.userName}>{user.name}</h2>
        <p style={styles.userEmail}>{user.email}</p>
        <p style={styles.userJoined}>Joined: {user.joined}</p>

        {/* Logout Button */}
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  profileCard: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "350px",
  },
  profileIcon: {
    fontSize: "50px",
    color: "#555",
    marginBottom: "10px",
  },
  profileImage: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "15px",
  },
  userName: {
    fontSize: "20px",
    marginBottom: "5px",
    color: "#333",
  },
  userEmail: {
    fontSize: "16px",
    color: "#777",
    marginBottom: "10px",
  },
  userJoined: {
    fontSize: "14px",
    color: "#888",
    marginBottom: "20px",
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default AccountPage;
