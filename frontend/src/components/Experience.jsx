// import React from "react";
import PropTypes from "prop-types";
import "../styles/Experience.css";


GenericInfo.propTypes = {
    bullet_points: PropTypes.arrayOf(PropTypes.string).isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    created_at_date: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
}
function GenericInfo(props){
    return (<>
        <ul className="experience-bullet-points">
            {props.bullet_points.map((bullet_point, index) => (
                <li key={index}>{bullet_point}</li>
            ))}
        </ul>
        <div className="experience-skills">
            <strong>Skills:</strong>
            {props.skills.length > 0 ? (
                props.skills.map((skill, index) => (
                    <span key={index} className="skill-badge">{skill}, </span>
                ))
            ) : (
                <span className="no-skills">No skills listed</span>
            )}
        </div>
        <p className="experience-created-at-date"><i>Created at: {props.created_at_date}</i></p>
        <button className="delete-button" onClick={() => props.onDelete(props.id)}>Delete</button>
    </>)
}

EducationInfo.propTypes = {
    institution: PropTypes.string,
    focus: PropTypes.string,
    location: PropTypes.string,
}
function EducationInfo(props){
    return (<>
        <h2>{props.institution}</h2>
        <h3>{props.focus}</h3>
        <p>{props.location}</p>
    </>)
}

ProjectInfo.propTypes = {
    title: PropTypes.string,
    location: PropTypes.string,
    demo_link: PropTypes.string,
    source_link: PropTypes.string,
    article_link: PropTypes.string,
}
function ProjectInfo(props){
    return (<>
        <h2>{props.title}</h2>
        <ul className="project-links-list">
            <strong>Project Links:</strong>
            {props.demo_link && <li><a href={props.demo_link}>Demo</a></li>}
            {props.source_link && <li><a href={props.source_link}>Source</a></li>}
            {props.article_link && <li><a href={props.article_link}>Article</a></li>}
        </ul>
    </>)
}

JobInfo.propTypes = {
    institution: PropTypes.string,
    title: PropTypes.string,
    location: PropTypes.string,
}
function JobInfo(props){
    return (<>
        <h2>{props.title}</h2>
        <h3>{props.institution}</h3>
        <p>{props.location}</p>
    </>)
}

Experience.propTypes = {
  experience: PropTypes.object.isRequired,
  type: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
}
function Experience(props) {
    const formattedCreatedAtDate = new Date(props.experience.created_at).toLocaleDateString("en-US")
    const skills_names = props.experience.skills.map(skillObject => skillObject.name);
    let SpecificInfo;
    switch (props.type){
        case "education":
            SpecificInfo = <EducationInfo
                institution={props.experience.institution}
                location={props.experience.location}
                focus={props.experience.focus}
                gpa={props.experience.gpa}
                gpa_scale={props.experience.gpa_scale} />
            break;
        case "job":
            SpecificInfo = <JobInfo
                institution={props.experience.institution}
                title={props.experience.title}
                location={props.experience.location} />
            break;
        case "project":
            SpecificInfo = <ProjectInfo
                title={props.experience.title}
                demo_link={props.experience.links.demo}
                source_link={props.experience.links.source}
                article_link={props.experience.links.article} />
            break;
        default:
            SpecificInfo = null;
    }
    console.log(props.experience)
    return (
        <div className="experience-container">
            { SpecificInfo }
            <GenericInfo
                bullet_points={props.experience.bullet_points}
                skills={skills_names}
                created_at_date={formattedCreatedAtDate}
                onDelete={props.onDelete}
                id={props.experience.id}
            />
            {(props.experience.start_date) && 
                <h3 className="experience-start-end-dates">{props.experience.start_date} to {props.experience.end_date || "Present"}</h3>}

        </div>
    );
}

export default Experience
