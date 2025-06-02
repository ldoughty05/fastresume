import { useState } from "react";
import api from "../api";
import PropTypes from "prop-types";

CreateExperience.propTypes = {
  getExperiences: PropTypes.func.isRequired, // function to update experiences list view immediately after creating a new experience
}
function CreateExperience(props){
    const [bullet_points, setBullet_points] = useState(""); // a single string with bullet points separated by new lines
    const [title, setTitle] = useState(""); // string
    const [start_date, setStart_date] = useState(); // a string in yyyy-MM-dd format
    const [end_date, setEnd_date] = useState();// a string in yyyy-MM-dd format
    const [experience_type, setExperienceType] = useState("work"); // string


    const createExperienceInDatabase = (e) => {
        let bullet_points_list = [];
        try {
            bullet_points_list = bullet_points.split("\n"); // splits long string into an array of strings delimited by new lines
            bullet_points_list = bullet_points_list.map((point) => point.trim()).filter((point) => point !== ""); // removes empty strings and trims whitespace
        } catch (error) {
            alert("Error processing bullet points. Please ensure they are formatted correctly.");
            return;
        }
        e.preventDefault();
        api
            .post("/api/experiences/", {title, start_date, end_date, bullet_points: bullet_points_list, experience_type })
            .then((res) => {
                if (res.status === 201) alert("Experience created!");
                else alert("Failed to create experience.");
                props.getExperiences(); // Does this need to be here? 
            })
            .catch((err) => alert(err));
    };

  return (
    <form onSubmit={createExperienceInDatabase}>
      <label htmlFor="experience_type">Experience Type:</label>
      <br />
      <select name="experience_type" id="experience_type"
        required onChange={(e) => setExperienceType(e.target.value)}
        value={experience_type}>
        <option value="education">Education</option>
        <option value="project">Project</option>
        <option value="volunteer">Volunteer</option>
        <option value="work">Work</option>
      </select>
      <br />
      <label htmlFor="title">Title:</label>
      <br />
      <input
        type="text"
        id="title"
        name="title"
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label htmlFor="start_date">Start Date:</label>
      <br />
      <input
        type="date"
        id="start_date"
        name="start_date"
        onChange={(e) => setStart_date(e.target.value)}
        value={start_date}
      />
      <label htmlFor="end_date">End Date:</label>
      <br />
      <input
        type="date"
        id="end_date"
        name="end_date"
        onChange={(e) => setEnd_date(e.target.value)}
        value={end_date}
      />
      <label htmlFor="bullet_points">Bullet Points: (write one per line)</label>
      <br />
      <textarea
        id="bullet_points"
        name="bullet_points"
        value={bullet_points}
        onChange={(e) => setBullet_points(e.target.value)}
      ></textarea>
      <br />
      <input type="submit" value="Submit"></input>
    </form>
  )
}
export default CreateExperience;