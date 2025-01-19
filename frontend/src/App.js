import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/LoginSignup/LoginPage';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from './components/NavBar';
import Budgets from './components/Budgets';

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
      </Routes>

    </BrowserRouter>
  );
}

export default App;
