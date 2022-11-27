import axios from "axios";

const api = {
  deleteNote: async (chosenNote) => {
    const response = await axios.delete(
      `http://localhost:3001/notes/${chosenNote.id}`
    );
    return response;
  },
  addNewNote: async (newNote) => {
    const response = await axios.post(`http://localhost:3001/notes`, newNote);
    return response;
  },
  getNotes: async (searchText) => {
    const response = await axios.get(`http://localhost:3001/notes`, {
      params: { q: searchText },
    });
    return response;
  },
  patchNote: async (note) => {
    const response = await axios.patch(
      `http://localhost:3001/notes/${note.id}`,
      note
    );
    return response;
  },
};

export default api;
