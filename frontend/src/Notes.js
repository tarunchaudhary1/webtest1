import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./App";
import AudioRecorder from "./AudioRecorder";
import './Notes.css'; // CSS file for styling

const Notes = () => {
    const { user, logout } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/notes", { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => setNotes(res.data))
            .catch(() => logout());
    }, [logout]);

    const addNote = async (content) => {
        const res = await axios.post(
            "http://localhost:5000/api/notes",
            { content },
            { headers: { Authorization: localStorage.getItem("token") } }
        );
        setNotes([...notes, res.data]);
    };

    return (
        <div className="notes-container">
            <h2>Welcome, {user.name}!</h2>
            <button className="logout-btn" onClick={logout}>Logout</button>

            <div className="note-input">
                <input
                    type="text"
                    placeholder="Write a note"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="note-input-field"
                />
                <button onClick={() => addNote(text)} className="add-note-btn">Add Note</button>
            </div>

            <AudioRecorder onSave={addNote} />

            <div className="notes-list">
                {notes.map((note) => (
                    <div key={note._id} className="note-card">
                        <p>{note.content}</p>
                        <button
                            className="delete-btn"
                            onClick={() => setNotes(notes.filter((n) => n._id !== note._id))}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;
