import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import { useState, useEffect } from "react";
import { Note as NoteModel } from "./models/noteModel";
import Note from "./components/Note";
import { Container, Row, Col, Button } from "react-bootstrap";
import * as notesApi from "./network/notes_api";
import AddEditNoteDialog from "./components/AddEditNoteDialogue";
import { FaPlus } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function getNotes() {
      try {
        const notes = await notesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    getNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await notesApi.deleteNote(note._id);
      setNotes(notes.filter((n) => n._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  return (
    <Container>
      <Button
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus className="me-2" />
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note
              note={note}
              className={styles.note}
              onNoteClicked={setNoteToEdit}
              onDeleteNoteClicked={deleteNote}
            />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote: NoteModel) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote: NoteModel) => {
            setNotes(
              notes.map((n) => (n._id === updatedNote._id ? updatedNote : n))
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </Container>
  );
}

export default App;
