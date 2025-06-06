import { useState } from "react";
import api from "../api";
import PropTypes from "prop-types";
import "../styles/CreateExperience.css"

function delimitString(string, delimiter) {
  let list = string.split(delimiter); // splits long string into an array of strings delimited by new lines
  return list.map((item) => item.trim()).filter((item) => item !== ""); // removes empty strings and trims whitespace
}

CreateExperience.propTypes = {
  getExperiences: PropTypes.func.isRequired, // function to update experiences list view immediately after creating a new experience
}
function CreateExperience(props){
    const [bullet_points, setBullet_points] = useState(""); // a single string with bullet points separated by new lines
    const [title, setTitle] = useState(""); // string
    const [start_date, setStart_date] = useState(""); // a string in yyyy-MM-dd format
    const [end_date, setEnd_date] = useState("");// a string in yyyy-MM-dd format
    const [experience_type, setExperienceType] = useState("work"); // string
    const [skills, setSkills] = useState(""); // a string of skills separated by commas


    const createExperienceInDatabase = (event) => {
        let bullet_points_list = [];
        try {
            bullet_points_list = delimitString(bullet_points, "\n");
        } catch (error) {
            alert("Error processing bullet points. Please ensure they are formatted correctly.");
            return;
        }
        let skills_list = [];
        try {
            skills_list = delimitString(skills, ",");
        } catch (error) {
            alert("Error processing skills. Please ensure they are formatted correctly.");
            return;
        }
        event.preventDefault();
        api
            .post("/api/experiences/all/", {
              experience_type: experience_type,
              title:title,
              start_date: start_date || null,
              end_date: end_date || null,
              bullet_points: bullet_points_list,
              skills: skills_list,
            })
            .then((res) => {
                if (res.status === 201) alert("Experience created!");
                else alert("Failed to create experience.");
                props.getExperiences();
            })
            .catch((err) => alert(err));
    };

  return (
    <form onSubmit={createExperienceInDatabase} className="create-experience-form">
      <label htmlFor="experience_type">Experience Type:</label>
      <select name="experience_type" id="experience_type"
        required onChange={(e) => setExperienceType(e.target.value)}
        value={experience_type}>
        <option value="education">Education</option>
        <option value="project">Project</option>
        <option value="volunteer">Volunteer</option>
        <option value="work">Work</option>
      </select>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <div className="date-inputs">
        <div className="labeled-input-pair">
          <label htmlFor="start_date">Start Date:</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            onChange={(e) => setStart_date(e.target.value)}
            value={start_date}
          />
        </div>
        <div className="labeled-input-pair">
          <label htmlFor="end_date">End Date:</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            onChange={(e) => setEnd_date(e.target.value)}
            value={end_date}
          />
        </div>
      </div>
      <label htmlFor="bullet_points">Bullet Points: (write one per line)</label>
      <textarea
        id="bullet_points"
        name="bullet_points"
        value={bullet_points}
        onChange={(e) => setBullet_points(e.target.value)}
      ></textarea>
      <label htmlFor="skills">Skills:</label>
      <input
        type="text"
        id="skills"
        name="skills"
        onChange={(e) => setSkills(e.target.value)}
        value={skills}
      />
      <input type="submit" value="Submit"></input>
    </form>
  )
}
export default CreateExperience;