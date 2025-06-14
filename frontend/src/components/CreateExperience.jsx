import { useState, useMemo } from "react";
import api from "../api";
import PropTypes from "prop-types";
import "../styles/CreateExperience.css"

function delimitString(string, delimiter) {
  let list = string.split(delimiter); // splits long string into an array of strings delimited by new lines
  return list.map((item) => item.trim()).filter((item) => item !== ""); // removes empty strings and trims whitespace
}

GenericFields.propTypes = {
  setStart_date: PropTypes.func.isRequired,
  start_date: PropTypes.string.isRequired,
  setEnd_date: PropTypes.func.isRequired,
  end_date: PropTypes.string.isRequired,
  setBullet_points: PropTypes.func.isRequired,
  bullet_points: PropTypes.string.isRequired,
  setSkills: PropTypes.func.isRequired,
  skills: PropTypes.string.isRequired,
}
function GenericFields(props) { 
  return (<>
    <div className="date-inputs">
      <div className="labeled-input-pair">
        <label htmlFor="start_date">Start Date:</label>
        <input
          type="date"
          id="start_date"
          name="start_date"
          onChange={(e) => props.setStart_date(e.target.value)}
          value={props.start_date}
        />
      </div>
      <div className="labeled-input-pair">
        <label htmlFor="end_date">End Date:</label>
        <input
          type="date"
          id="end_date"
          name="end_date"
          onChange={(e) => props.setEnd_date(e.target.value)}
          value={props.end_date}
        />
      </div>
    </div>
    <label htmlFor="bullet_points">Bullet Points: (write one per line)</label>
    <textarea
      id="bullet_points"
      name="bullet_points"
      value={props.bullet_points}
      onChange={(e) => props.setBullet_points(e.target.value)}
    ></textarea>
    <label htmlFor="skills">Skills:</label>
    <input
      type="text"
      id="skills"
      name="skills"
      onChange={(e) => props.setSkills(e.target.value)}
      value={props.skills}
    />
  </>)
}
EducationSpecificFields.propTypes = {
  setInstitution: PropTypes.func.isRequired,
  institution: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  setFocus: PropTypes.func.isRequired,
  focus: PropTypes.string.isRequired,
  setGpa: PropTypes.func.isRequired,
  gpa: PropTypes.string.isRequired,
  setGpa_scale: PropTypes.func.isRequired,
  gpa_scale: PropTypes.string.isRequired,
}
function EducationSpecificFields(props) {
  return (<>
    <label htmlFor="institution">Institution:</label>
    <input
      type="text"
      id="institution"
      name="institution"
      onChange={(e) => props.setInstitution(e.target.value)}
      value={props.institution}
    />
    <label htmlFor="location">Location:</label>
    <input
      type="text"
      id="location"
      name="location"
      onChange={(e) => props.setLocation(e.target.value)}
      value={props.location}
    />
    <label htmlFor="focus">Major/Focus:</label>
    <input
      type="text"
      id="focus"
      name="focus"
      onChange={(e) => props.setFocus(e.target.value)}
      value={props.focus}
    />
    <div className="gpa-and-scale-inputs">
      <label htmlFor="gpa">GPA:</label>
      <input
        type="number"
        step="0.01"
        min="0"
        id="gpa"
        name="gpa"
        onChange={(e) => props.setGpa(e.target.value)}
        value={props.gpa}
      />
      <label htmlFor="gpa_scale">GPA Scale:</label>
      <input
        type="number"
        min="0"
        max="100"
        id="gpa_scale"
        name="gpa_scale"
        onChange={(e) => props.setGpa_scale(e.target.value)}
        value={props.gpa_scale}
      />
    </div>
  </>)
}

JobSpecificFields.propTypes = {
  setInstitution: PropTypes.func.isRequired,
  institution: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
}
function JobSpecificFields(props) {
  return (<>
    <label htmlFor="title">Title:</label>
    <input
      type="text"
      id="title"
      name="title"
      required
      onChange={(e) => props.setTitle(e.target.value)}
      value={props.title}
    />
    <label htmlFor="company">Company:</label>
    <input
      type="text"
      id="company"
      name="company"
      onChange={(e) => props.setInstitution(e.target.value)}
      value={props.institution}
    />
    <label htmlFor="location">Location:</label>
    <input
      type="text"
      id="location"
      name="location"
      onChange={(e) => props.setLocation(e.target.value)}
      value={props.location}
    />
  </>)
}

ProjectSpecificFields.propTypes = {
  setTitle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setDemo_link: PropTypes.func.isRequired,
  demo_link: PropTypes.string.isRequired,
  setSource_link: PropTypes.func.isRequired,
  source_link: PropTypes.string.isRequired,
  setArticle_link: PropTypes.func.isRequired,
  article_link: PropTypes.string.isRequired,
}
function ProjectSpecificFields(props) {
  return (<>
    <label htmlFor="title">Title:</label>
    <input
      type="text"
      id="title"
      name="title"
      required
      onChange={(e) => props.setTitle(e.target.value)}
      value={props.title}
    />
    <label htmlFor="demo_link">Demo Link:</label>
    <input
      type="text"
      id="demo_link"
      name="demo_link"
      onChange={(e) => props.setDemo_link(e.target.value)}
      value={props.demo_link}
    />
    <label htmlFor="source_link">Source Link:</label>
    <input
      type="text"
      id="source_link"
      name="source_link"
      onChange={(e) => props.setSource_link(e.target.value)}
      value={props.source_link}
    />
    <label htmlFor="article_link">Article Link:</label>
    <input
      type="text"
      id="article_link"
      name="article_link"
      onChange={(e) => props.setArticle_link(e.target.value)}
      value={props.article_link}
    />
  </>)
}

CreateExperience.propTypes = {
  getExperiences: PropTypes.func.isRequired, // function to update experiences list view immediately after creating a new experience
}
function CreateExperience(props){
  const [experience_type, setExperience_type] = useState("work"); // string
  const [start_date, setStart_date] = useState(""); // a string in yyyy-MM-dd format
  const [end_date, setEnd_date] = useState("");// a string in yyyy-MM-dd format
  const [bullet_points, setBullet_points] = useState(""); // a single string with bullet points separated by new lines
  const [skills, setSkills] = useState(""); // a string of skills separated by commas
  const [institution, setInstitution] = useState(""); // can be company or school
  const [title, setTitle] = useState(""); // string
  const [location, setLocation] = useState("");
  const [focus, setFocus] = useState(""); // can be career focus or college major
  const [demo_link, setDemo_link] = useState("");
  const [source_link, setSource_link] = useState("");
  const [article_link, setArticle_link] = useState("");
  const [gpa, setGpa] = useState("");
  const [gpa_scale, setGpa_scale] = useState("4");

  function sendJobExperienceCreateRequest(bullet_points_list, skills_input_list) {
    api
      .post("/api/experiences/jobs/", {
        start_date: start_date || null,
        end_date: end_date || null,
        bullet_points: bullet_points_list,
        skills_input_list: skills_input_list,
        institution: institution, 
        title:title,
        location: location,
      })
      .then((res) => {
        if (res.status === 201) alert("Job experience created!");
        else alert("Failed to create job experience.");
        props.getExperiences();
      })
      .catch((err) => alert(err));
  }

  function sendEducationExperienceCreateRequest(bullet_points_list, skills_input_list) {
    api
      .post("/api/experiences/education/", {
        start_date: start_date || null,
        end_date: end_date || null,
        bullet_points: bullet_points_list,
        skills_input_list: skills_input_list,
        institution: institution,
        location: location,
        focus: focus,
        gpa: gpa,
        gpa_scale: gpa_scale,
      })
      .then((res) => {
        if (res.status === 201) alert("Education experience created!");
        else alert("Failed to create education experience.");
        props.getExperiences();
      })
      .catch((err) => alert(err));
  }

  function sendProjectExperienceCreateRequest(bullet_points_list, skills_input_list) {
    const linkDict = {
      "demo": demo_link,
      "source": source_link,
      "article": article_link,
    }
    api
      .post("/api/experiences/projects/", {
        title:title,
        start_date: start_date || null,
        end_date: end_date || null,
        bullet_points: bullet_points_list,
        skills_input_list: skills_input_list,
        links: linkDict
      })
      .then((res) => {
        if (res.status === 201) alert("Project experience created!");
        else alert("Failed to create project experience.");
        props.getExperiences();
      })
      .catch((err) => alert(err));
  }

  const sendExperienceDetailsToBackend = (event) => {
    let bullet_points_list = [];
    try {
      bullet_points_list = delimitString(bullet_points, "\n");
    } catch (error) {
      alert("Error processing bullet points. Please ensure they are formatted correctly.");
      return;
    }
    let skills_input_list = [];
    try {
      skills_input_list = delimitString(skills, ",");
    } catch (error) {
      alert("Error processing skills. Please ensure they are formatted correctly.");
      return;
    }
    event.preventDefault(); // prevents page from reloading on form submission
    console.log(experience_type);
    switch (experience_type) {
      case "education":
        sendEducationExperienceCreateRequest(bullet_points_list, skills_input_list);
        break;
      case "project":
        sendProjectExperienceCreateRequest(bullet_points_list, skills_input_list);
        break;
      case "job":
        sendJobExperienceCreateRequest(bullet_points_list, skills_input_list);
        break;
      default:
        alert("Invalid experience type selected. Please choose a valid option.");
    }
  }

  const genericFieldProps = useMemo(() => ({
    setStart_date,
    start_date,
    setEnd_date,
    end_date,
    setBullet_points,
    bullet_points,
    setSkills,
    skills,
  }), [start_date, end_date, bullet_points, skills]);

  const educationFieldProps = useMemo(() => ({
    setInstitution,
    institution,
    setLocation,
    location,
    setFocus,
    focus,
    setGpa,
    gpa,
    setGpa_scale,
    gpa_scale,
  }), [institution, location, focus, gpa, gpa_scale]);

  const jobFieldProps = useMemo(() => ({
    setInstitution,
    institution,
    setTitle,
    title,
    setLocation,
    location,
  }), [institution, title, location]);

  const projectFieldProps = useMemo(() => ({
    setTitle,
    title,
    setDemo_link,
    demo_link,
    setSource_link,
    source_link,
    setArticle_link,
    article_link,
  }), [title, demo_link, source_link, article_link]);

  let SpecificFields;
  switch (experience_type) {
    case "education":
      SpecificFields = <EducationSpecificFields {...educationFieldProps} />;
      break;
    case "job":
      SpecificFields = <JobSpecificFields {...jobFieldProps} />;
      break;
    case "project":
      SpecificFields  = <ProjectSpecificFields {...projectFieldProps} />;
      break;
    default:
      SpecificFields = null;
  }

  return (
    <form onSubmit={sendExperienceDetailsToBackend} className="create-experience-form">
      <label htmlFor="experience_type">Experience Type:</label>
      <select name="experience_type" id="experience_type"
        required onChange={(e) => setExperience_type(e.target.value)}
        value={experience_type}>
        <option value="">SELECT TYPE</option>
        <option value="education">Education</option>
        <option value="project">Project</option>
        <option value="job">Job</option>
      </select>
      { SpecificFields }
      <GenericFields {...genericFieldProps} />
      <input type="submit" value="Submit"></input>
    </form>
  )
}
export default CreateExperience;