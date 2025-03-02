import { useState, useEffect } from "react";
import api from "../api";
import Experience from "../components/Experience"
import "../styles/Home.css"

function Home() {
    const [experiences, setExperiences] = useState([]);
    const [bullet_points, setBullet_points] = useState("");
    const [title, setTitle] = useState("");
    const [experience_type, setExperienceType] = useState("work");

    useEffect(() => {
        getExperiences();
    }, []);

    const getExperiences = () => {
        api
            .get("/api/experiences/")
            .then((res) => res.data)
            .then((data) => {
                setExperiences(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteExperience = (id) => {
        api
            .delete(`/api/experiences/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Experience deleted!");
                else alert("Failed to delete experience.");
                getExperiences();
            })
            .catch((error) => alert(error));
    };

    const createExperience = (e) => {
        e.preventDefault();
        api
            .post("/api/experiences/", { bullet_points, title, experience_type })
            .then((res) => {
                if (res.status === 201) alert("Experience created!");
                else alert("Failed to create experience.");
                getExperiences();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h2>Experiences</h2>
                {experiences.map((experience) => (
                    <Experience experience={experience} onDelete={deleteExperience} key={experience.id} />
                ))}
            </div>
            <h2>Add an Experience</h2>
            <form onSubmit={createExperience}>
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
                <label htmlFor="bullet_points">Bullet Points: (write one per line)</label>
                <br />
                <textarea
                    id="bullet_points"
                    name="bullet_points"
                    required
                    value={bullet_points}
                    onChange={(e) => setBullet_points(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;
