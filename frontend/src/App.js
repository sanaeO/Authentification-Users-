import React from 'react';
import { Routes , Route , Router} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Header from "./components/Header"
import Container from "react-bootstrap/Container"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div>
     {/* Routing :  */}
   
     <Header />
     <Container>
    <Routes>
    <Route path="/" exact element={<Dashboard />} />
    <Route path="/login" exact element={<Login />} />
    <Route path="/register" exact element={<Register />} />
     </Routes>
     <ToastContainer/>
     </Container>

    </div>
  );
}

export default App;
