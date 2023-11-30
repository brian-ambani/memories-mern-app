import styles from "./styles/Wrapper.module.css";
import { useState, useEffect } from "react";
import { Note as NoteModel } from "./models/noteModel";
import Note from "./components/Note";
function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function getNotes() {
      try {
        const response = await fetch("/api/notes", {
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
  return (
    <div className={styles.Wrapper}>
      {notes.map((note) => (
        <Note note={note} key={note._id} />
      ))}
    </div>
  );
}

export default App;
