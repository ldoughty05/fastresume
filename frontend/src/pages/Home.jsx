import { useState, useEffect } from "react";
import api from "../api";
import Experience from "../components/Experience"
import CreateExperience from "../components/CreateExperience";
import "../styles/Home.css"

function Home() {
    const [experiences, setExperiences] = useState([]); // list of experience objects
    useEffect(() => {
        getExperiencesFromDatabase();
    }, []);

    const getExperiencesFromDatabase = () => {
        api
            .get("/api/experiences/")
            .then((res) => res.data)
            .then((data) => {
                setExperiences(data);
            })
            .catch((err) => alert(err));
    };

    const deleteExperienceFromDatabase = (id) => {
        api
            .delete(`/api/experiences/delete/${id}/`)
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
                <h2>Experiences</h2>
                {experiences.map((experience) => (
                    <Experience experience={experience} onDelete={deleteExperienceFromDatabase} key={experience.id} />
                ))}
            </div>
            <h2>Add an Experience</h2>
            <CreateExperience
                getExperiences={getExperiencesFromDatabase}
            />
        </div>
    );
}

export default Home;
