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
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

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
              <Budgets />
            </>
          } 
        />
        <Route path="/max-expense" element={
            <>
              <NavBar />
              <MaxExpense />
            </>
          }  />
        <Route path="/profile" element={
            <>
              <NavBar />
              <Profile />
            </>
          }  />

        <Route path="/savings" element={
            <>
              <NavBar />
              <Savings />
            </>
          }  />

        <Route path="/budgets/:budgetId/info" element={
          <>
            <NavBar />
            <BudgetInfo />
          </>
        }  />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
