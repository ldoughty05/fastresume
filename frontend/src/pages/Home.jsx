import { useState, useEffect } from "react";
import api from "../api";
import Experience from "../components/Experience"
import CreateExperience from "../components/CreateExperience";
import "../styles/Home.css"

function Home() {
    const [jobs, setJobs] = useState([]); // list of experience objects
    const [education, setEducation] = useState([]); // list of experience objects
    const [projects, setProjects] = useState([]); // list of experience objects

    useEffect(() => {
        getExperiencesFromDatabase();
    }, []);

    const getExperiencesFromDatabase = () => {
        api
            .get("/api/experiences/jobs/")
            .then((res) => res.data)
            .then((data) => {
                setJobs(data);
            })
            .catch((err) => alert(err));
        api
            .get("/api/experiences/education/")
            .then((res) => res.data)
            .then((data) => {
                setEducation(data);
            })
            .catch((err) => alert(err));
        api
            .get("/api/experiences/projects/")
            .then((res) => res.data)
            .then((data) => {
                setProjects(data);
            })
            .catch((err) => alert(err));
    };

    const deleteExperienceFromDatabase = (id) => {
        api
            .delete(`/api/experiences/all/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Experience deleted!");
                else alert("Failed to delete experience.");
                getExperiencesFromDatabase(); // Does this need to be here? 
            })
            .catch((error) => alert(error));
    };

    return (
        <div>
            <div>
                <h1>Education</h1>
                {education.map((experience, index) => (
                    <Experience experience={experience} onDelete={deleteExperienceFromDatabase} key={`education-${index}`} />
                ))}
                <h1>Jobs</h1>
                {jobs.map((experience, index) => (
                    <Experience experience={experience} onDelete={deleteExperienceFromDatabase} key={`job-${index}`} />
                ))}
                <h1>Projects</h1>
                {projects.map((experience, index) => (
                    <Experience experience={experience} onDelete={deleteExperienceFromDatabase} key={`project-${index}`} />
                ))}
            </div>
            <br/><br/>
            <h1>Add an Experience</h1>
            <CreateExperience
                getExperiences={getExperiencesFromDatabase}
            />
        </div>
    );
}

export default Home;
