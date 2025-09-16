import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../layout/NavBar';
import Breadcrumbs from '../layout/Breadcrumbs';
import '../Shared.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    axios
      .get('/admin/users', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUsers(res.data.users.data || []))
      .catch(() => setUsers([]));
  }, []);

  return (
    <>
      <NavBar />
      <Breadcrumbs />
      <div className="page-container">
        <h2 className="page-title">Korisnici (admin)</h2>

        <div className="content-card">
          {users.length > 0 ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr key={u.id}>
                    <td>{idx + 1}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          u.role === 'admin'
                            ? 'bg-primary'
                            : 'bg-secondary'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td>{new Date(u.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nema korisnika.</p>
          )}
        </div>
      </div>
    </>
  );
}
