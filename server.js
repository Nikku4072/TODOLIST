const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Serve static files from a "public" directory
app.use(express.static('public'));

const completedTasks = [];

app.post('/complete-task', (req, res) => {
  const task = req.body.task;
  if (task) {
    completedTasks.push(task);
    res.status(201).json({ message: 'Task completed and stored.' });
  } else {
    res.status(400).json({ message: 'Invalid task data.' });
  }
});

app.get('/completed-tasks', (req, res) => {
  res.status(200).json(completedTasks);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
