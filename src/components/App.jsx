import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/notes");
      setNotes(response.data.data || response.data); // Adjust based on response format
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async (note) => {
    try {
      const response = await axios.post("http://localhost:8080/notes", note);
      setNotes([...notes, response.data.data || response.data]); // Adjust based on response format
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const noteId = parseInt(id); // Ensure the ID is a number
      if (isNaN(noteId)) {
        console.error("Invalid note ID");
        return;
      }

      // Optimistically update UI by filtering the deleted note
      setNotes((prevNotes) => prevNotes.filter((note) => note.noteId !== noteId));

      // Send DELETE request to the API
      await axios.delete(`http://localhost:8080/notes/${noteId}`);
    } catch (error) {
      console.error("Error deleting note:", error);

      // Optional: Rollback UI update in case of an error
      fetchNotes(); // Re-fetch all notes to ensure state is accurate
    }
  };

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => (
        <Note
          key={noteItem.noteId}
          id={noteItem.noteId}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
