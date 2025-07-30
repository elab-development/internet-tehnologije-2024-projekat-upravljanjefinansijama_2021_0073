import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div style={{color: 'white'}}>Loading...</div>;
  }

  if (!user) {
    return <div style={{color: 'white'}}>Error fetching profile.</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1 style={{color: '#113F67'}}>Profile</h1>
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
        alt="Profile"
        style={{ borderRadius: '50%', marginBottom: '20px', width: 200, height: 200 }}
      />
      <p style={{color: 'white'}}>
        <strong >Username:</strong> {user.username}
      </p>
      <p style={{color: 'white'}}>
        <strong>Email:</strong> {user.email}
      </p>
      <p style={{color: 'white'}}>
        <strong>Account Created:</strong> {user.created_at}
      </p>
    </div>
  );
};

export default Profile;