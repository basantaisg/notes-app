const express = require('express');

const app = express();

app.use(express.json());

const notesData = [];

// Routing starts here...

app.get('/api/notes', (req, res) => {
  res.json(notesData);
});

app.post('/api/notes', (req, res) => {
  const { title, description } = req.body;

  let id = notesData.length + 1;

  notesData.push({ id: id, title: title, description: description });

  res.json({ message: 'Note Successfully added' });
});

app.put('/api/notes/:id', (req, res) => {
  const { title, description } = req.body;
  const id = req.params;

  const notes = notesData.find((n) => n.id === parseInt(id));

  if (!notes) {
    res.status(404).json({ Error: 'Notes not found' });
  }

  if (notes.title === undefined) notes.title = title;
  if (notes.description === undefined) notes.description = description;

  res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params;

  const findnoteindex = notesData.findIndex((n) => n.id === parseInt(id));

  if (findnoteindex === -1) return res.json({ ERROR: 'Not found!' });

  notesData.splice(findnoteindex, 1);
  res.status(203);
});

app.listen(3000);
