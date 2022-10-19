import Navbar from "react-bootstrap/Navbar"
import { Link, useNavigate } from "react-router-dom"
import "./Header.css"
import { FaSignInAlt , FaSignOutAlt  ,FaUser} from "react-icons/fa"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { useSelector , useDispatch } from "react-redux" 
import { reset , logout  } from "../features/Auth/authSlice"

function Header()
{
// useSelector :
const { user } = useSelector((state) => state.auth)
const dispatch = useDispatch()
const Navigate = useNavigate()

function onLogout(){

    dispatch(logout())
    dispatch(reset())
    Navigate("/")
}
return (
<header>

    <Navbar className="header">
      <Container>
        <Navbar.Brand href="#">LOGO</Navbar.Brand>
        <Navbar.Toggle />

    {(user) ? 
(  
        <Navbar.Collapse className="justify-content-end">
        <Link className="link" to="#"><FaUser />user.name</Link>
        <Button  onClick={onLogout} variant="warning" m-l="5px"><FaSignOutAlt />Logout</Button>
        </Navbar.Collapse>  
) : (
      <Navbar.Collapse className="justify-content-end">
        <Link className="link" to="/login"><FaSignInAlt />Login</Link>
        <Link  className="link" to="/register" m-l="5px"><FaUser />Register</Link>
        </Navbar.Collapse>  
)}  
        
        </Container>
    </Navbar>
  
</header>
    );
}

export default Header ;