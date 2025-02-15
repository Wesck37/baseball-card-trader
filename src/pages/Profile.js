import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
  });

  // Fetch the user profile from the back-end
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Assume JWT is stored in localStorage
        const response = await fetch('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setFormData(data.user); // Populate form data with user info
        } else {
          console.error('Failed to fetch profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT', // Update user profile
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user); // Update the user state
        setIsEditing(false);
        alert('Profile updated successfully.');
      } else {
        const errorData = await response.json();
        alert(`Failed to update profile: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return (
      <div className="profile">
        <h1>Baseball Card Trader</h1>
        <div className="generic-profile">
          <p>Welcome to the Baseball Card Trading App!</p>
          <p>Here, you can:</p>
          <ul>
            <li>Discover rare and exciting baseball cards</li>
            <li>Trade cards with other collectors</li>
            <li>Build your own collection</li>
          </ul>
          <p>Please <strong>log in</strong> or <strong>sign up</strong> to access your personalized profile and start trading!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="profile-card">
        <label>
          Username:
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          ) : (
            <span>{user.username}</span>
          )}
        </label>
        <label>
          Email:
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          ) : (
            <span>{user.email}</span>
          )}
        </label>
        <label>
          Bio:
          {isEditing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          ) : (
            <p>{user.bio}</p>
          )}
        </label>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEditToggle}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default Profile;


// Features Included:
// User Info Display: Displays username, email, and bio.
// Edit Mode: Allows users to update their profile details.
// Save Functionality: A placeholder for saving changes, which could be extended with API calls.
// Next Steps:
// Integrate with your backend to persist changes.
// Add a profile picture upload feature.
// Display user's collected/traded cards on this page.