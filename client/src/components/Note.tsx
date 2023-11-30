import styles from "../styles/Note.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModal } from "../models/noteModel";

interface NoteProps {
  note: NoteModal;
}

const Notes = ({ note }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  return (
    <Card className={styles.noteCard}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
        <Card.Text>{createdAt}</Card.Text>
        <Card.Text>{updatedAt}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Notes;
