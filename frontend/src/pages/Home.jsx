import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faAmazon, faMeta, faMicrosoft, faApple, faOpenai, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Home() {
  const navigate = useNavigate();
  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1>Fast Resume</h1>
        <div className={styles.header_buttons}>
          <button className={styles.log_in_button} onClick={() => navigate('/login')}>Log in</button>
          <button className={styles.hamburger_button} >
            <FontAwesomeIcon icon={faBars} widthAuto/>
          </button>
        </div>
      </div>
      <div className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.tagline}>Be the perfect candidate</h1>
          <h2>FastResume generates a tailored resume in seconds using AI that matches your skills to any job description</h2>
          <button className={styles.get_started_button} onClick={() => navigate('/register')}>Get Started</button>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.features}>
            <h1>Instantly tailored resume for every application</h1>
            <h2>Show off the experiences that stand out the most for each and every employer</h2>
          </div>
          <div className={styles.problem_solution}>
            <h1>One-size-fits-all resumes don’t work.</h1>
            <h2>Each employer values different skills. FastResume creates a unique resume fine-tuned to show that you have the exact skills they are looking for.</h2>
            <h1>Turn your resume into a living document</h1>
            <h2>Write about each and every job and project you have worked on and FastResume’s AI picks out the most relevant experiences for each and every job.</h2>
          </div>
          <div className={styles.how_it_works}>
            <h1>How it works</h1>
            <ol>
              <li>Write bullet points about your projects and experiences</li>
              <li>Paste in a job description</li>
              <li>FastResume AI picks out which projects and experiences best match the job description</li>
              <li>Generates a tailored resume as a pdf</li>
            </ol>
          </div>
          <div className={styles.social_proof}>
            <h1>Perfect for job seekers targeting companies like...</h1>
            <ul>
              <li><FontAwesomeIcon icon={faGoogle} widthAuto/></li>
              <li><FontAwesomeIcon icon={faAmazon} widthAuto/></li>
              <li><FontAwesomeIcon icon={faMeta} widthAuto/></li>
              <li><FontAwesomeIcon icon={faMicrosoft} widthAuto/></li>
              <li><FontAwesomeIcon icon={faApple} widthAuto/></li>
              <li><FontAwesomeIcon icon={faOpenai} widthAuto/></li>
            </ul>
            <h1>Trusted to Make Application Season Easier</h1>
            <button className={styles.get_started_button} onClick={() => navigate('/register')}>Use it for Free</button>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <h3>Krank Software Solutions</h3>
        <div className={styles.links_grid}>
          <ul>
            <lh>GET STARTED</lh>
            <li><button onClick={() => navigate('/register')}>Sign Up</button></li>
            <li><button onClick={() => navigate('/login')}>Log In</button></li>
          </ul>
          <ul>
            <lh>SOLUTIONS</lh>
          </ul>
          <ul>
            <lh>RESOURCES</lh>
          </ul>
          <ul>
            <lh>LEGAL</lh>
          </ul>
        </div>
        <hr/>
        <p>Status: <span className={styles.status}>All Systems Operational</span></p>
        <ul className={styles.socials}>
          <li><a href="https://www.linkedin.com/company/krank-software-solutions/"><FontAwesomeIcon icon={faLinkedin} widthAuto/></a></li>
        </ul>
        <p>© 2025 FastResume. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Home;