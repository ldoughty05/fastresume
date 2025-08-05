import Form from "../components/Form"
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'
import styles from '../styles/Form.module.css';
import { Logo } from '../components/Logo';

function Login() {
    const navigate = useNavigate();

    return (
        <div className="background_grid" style={{ height: "100vh" }}>
            <div className={styles.content}>
                <Logo />
                <Form route="/api/token/" method="login" />
                <p>Don&apos;t have an account?</p>
                <button onClick={() => { navigate('/register/') }}>Register</button>
            </div>
        </div>
    )
}

export default Login