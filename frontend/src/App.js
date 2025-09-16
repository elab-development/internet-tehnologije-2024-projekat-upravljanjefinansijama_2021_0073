import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from './components/layout/NavBar';
import Budgets from './components/budget/Budgets';
import MaxExpense from './components/layout/MaxExpense';
import Profile from './components/layout/Profile';
import Savings from './components/layout/Savings';
import BudgetInfo from './components/budget/BudgetInfo';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Breadcrumbs from './components/layout/Breadcrumbs';
import AdminUsers from './components/admin/AdminUsers';

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/authentification" element={<LoginPage />}/>
        <Route 
          path="/" 
          element={
            <>
              <NavBar />
              <Breadcrumbs />
              <Budgets />
            </>
          } 
        />
        <Route path="/max-expense" element={
            <>
              <NavBar />
              <Breadcrumbs />
              <MaxExpense />
            </>
          }  />
        <Route path="/profile" element={
            <>
              <NavBar />
              <Breadcrumbs />
              <Profile />
            </>
          }  />

        <Route path="/savings" element={
            <>
              <NavBar />
              <Breadcrumbs />
              <Savings />
            </>
          }  />

        <Route path="/budgets/:budgetId/info" element={
          <>
            <NavBar />
            <Breadcrumbs />
            <BudgetInfo />
          </>
        }  />

        
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route path="/admin/users" element={<AdminUsers />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
