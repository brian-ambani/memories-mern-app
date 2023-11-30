import { useState, useEffect } from "react";
import "./App.css";
import { Note } from "./models/noteModel";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function getNotes() {
      try {
        const response = await fetch("http://localhost:5000/api/notes", {
          method: "GET",
        });
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    getNotes();
  }, []);
  return <div className="App">{JSON.stringify(notes)}</div>;
}

export default App;
