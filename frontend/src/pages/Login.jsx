import Form from "../components/Form"
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/register/'); // or /api/user/register/?
    };

    return <div>
        <Form route="/api/token/" method="login" />
        <button className="register-button" onClick={handleClick}>
            Register
        </button>
    </div>
}

export default Login