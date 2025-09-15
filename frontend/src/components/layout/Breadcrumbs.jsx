import { Link, useLocation, useParams } from 'react-router-dom';

const labels = {
  '': 'Dashboard',
  'max-expense': 'Max Expense',
  'savings': 'Savings',
  'profile': 'Profile',
  'budgets': 'Budgets',
  'info': 'Details',
  'authentification': 'Login'
};

export default function Breadcrumbs() {
  const location = useLocation();
  const params = useParams();
  const parts = location.pathname.split('/').filter(Boolean);

  let path = '';
  return (
    <nav 
      aria-label="breadcrumb" 
      style={{ 
        padding: '8px 16px', 
        display: 'flex', 
        justifyContent: 'center' 
      }}
    >
      <ol 
        className="breadcrumb" 
        style={{ 
          margin: 0, 
          fontSize: '0.9rem', 
          color: '#6c757d' 
        }}
      >
        <li className="breadcrumb-item">
          <Link to="/" style={{ color: '#6c757d', textDecoration: 'none' }}>
            Dashboard
          </Link>
        </li>
        {parts.map((seg, idx) => {
          path += `/${seg}`;
          const isLast = idx === parts.length - 1;
          const label = labels[seg] || (params.budgetId === seg ? `Budget ${seg}` : seg);
          return isLast ? (
            <li 
              className="breadcrumb-item active" 
              aria-current="page" 
              key={path} 
              style={{ color: '#000' }}
            >
              {label}
            </li>
          ) : (
            <li className="breadcrumb-item" key={path}>
              <Link to={path} style={{ color: '#6c757d', textDecoration: 'none' }}>
                {label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
