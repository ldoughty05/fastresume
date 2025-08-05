import Form from "../components/Form"
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'
import styles from '../styles/Form.module.css';
import { Logo } from '../components/Logo';

function Register() {
    const navigate = useNavigate();

    return (
        <div className="background_grid" style={{ height: "100vh" }}>
            <div className={styles.content}>
                <Logo />
                <Form route="/api/user/register/" method="register" />    
                <p>Already have an account?</p>
                <button onClick={() => { navigate('/login/') }}>Log in</button>
            </div>
        </div>
    )}

export default Register