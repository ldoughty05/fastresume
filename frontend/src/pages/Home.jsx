import { useState, useEffect } from "react";
import api from "../api";
import Experience from "../components/Experience"
import "../styles/Home.css"

function Home() {
    const [experiences, setExperiences] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

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
            .post("/api/experiences/", { content, title })
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
                <h2>Notes</h2>
                {experiences.map((experience) => (
                    <Experience experience={experience} onDelete={deleteExperience} key={experience.id} />
                ))}
            </div>
            <h2>Add an Experience</h2>
            <form onSubmit={createExperience}>
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
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;
