import Form from "./Form"
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/register/'); // or /api/user/register/?
    };

    
    return (
    <div>
        <div id ="logIn" >
            <img src ="LogoV2.png" alt = "logo"></img>
            <Form route="/api/token/" method="login" />
        </div>
    
        <button className="register-button" onClick={handleClick}>
            Register
        </button>

    </div>
    )
}

export default Login