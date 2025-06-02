// import React from "react";
import PropTypes from "prop-types";
import "../styles/Experience.css";



Experience.propTypes = {
  experience: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
}
function Experience(props) {
    const formattedCreatedAtDate = new Date(props.experience.created_at).toLocaleDateString("en-US")

    return (
        <div className="experience-container">
            <h2 className="experience-title">{props.experience.title}</h2>
            {(props.experience.start_date) && 
                <h3 className="experience-start-end-dates">{props.experience.start_date} to {props.experience.end_date || "Present"}</h3>}
            <ul className="experience-bullet-points">
                {props.experience.bullet_points.map((bullet_point, index) => (
                    <li key={index}>{bullet_point}</li>
                ))}
            </ul>
            <p className="experience-created-at-date"><i>Created at: {formattedCreatedAtDate}</i></p>
            <button className="delete-button" onClick={() => props.onDelete(props.experience.id)}>
                Delete
            </button>
        </div>
    );
}

export default Experience
