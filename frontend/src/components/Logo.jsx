import styles from '../styles/Logo.module.css';
import { useNavigate } from 'react-router-dom';

function Logo() {
  const navigate = useNavigate();
  return (
    <button className={styles.logo} onClick={() => navigate('/')}>
      <h1>FastResume</h1>
    </button>
  )
}

export { Logo };