import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/LoginSignup/LoginPage';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from './components/NavBar';
import Budgets from './components/Budgets';
import MaxExpense from './components/MaxExpense';
import Profile from './components/Profile';
import Savings from './components/Savings';

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
      </Routes>

    </BrowserRouter>
  );
}

export default App;
