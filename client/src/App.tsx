import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import { useState, useEffect } from "react";
import { Note as NoteModel } from "./models/noteModel";
import Note from "./components/Note";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import * as notesApi from "./network/notes_api";
import AddEditNoteDialog from "./components/AddEditNoteDialogue";
import { FaPlus } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function getNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await notesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
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

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
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
  );

  return (
    <Container className={styles.notePage}>
      <Button
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus className="me-2" />
        Add new note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && (
        <div className={stylesUtils.blockCenter}>
          <p className="text-danger">Error loading notes.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.length === 0 && (
            <p className={stylesUtils.blockCenter}>No notes yet.</p>
          )}
          {notes.length > 0 && notesGrid}
        </>
      )}
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
