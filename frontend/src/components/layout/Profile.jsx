import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Shared.css'

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/profile', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Greška pri dohvatanju profila:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="page-container">Učitavanje...</div>;
  }

  if (!user) {
    return <div className="page-container">Greška pri dohvatanju profila.</div>;
  }

  const formattedDate = new Date(user.created_at).toLocaleDateString('sr-RS');

  return (
    <div className="page-container">
      <h1 className="page-title">Profil</h1>
      <div className="content-card profile-card">
        <img
          src="https://i.pravatar.cc/150" 
          alt="Profile"
          className="profile-avatar"
        />
        <div className="profile-info">
          <p><strong>Korisničko ime:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Nalog kreiran:</strong> {formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;