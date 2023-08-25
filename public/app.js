document.addEventListener('DOMContentLoaded', () => {
  const addItemButton = document.getElementById('addItem');
  const remainingTodosList = document.getElementById('remainingTodos');
  const completedTodosList = document.getElementById('completedTodos');

  addItemButton.addEventListener('click', async () => {
    const todoNameInput = document.getElementById('todoName');
    const todoDescriptionInput = document.getElementById('todoDescription');
    const newTask = {
      name: todoNameInput.value,
      description: todoDescriptionInput.value
    };

    // Create a new list item for the task
    const listItem = document.createElement('li');
    listItem.textContent = `${newTask.name}: ${newTask.description}`;

    // Create tick and cross buttons
    const tickButton = document.createElement('button');
    tickButton.textContent = '✓';
    const crossButton = document.createElement('button');
    crossButton.textContent = '✕';

    // Add click event to tick button to move task to completed list
    tickButton.addEventListener('click', async () => {
      listItem.removeChild(tickButton);
      listItem.removeChild(crossButton);
      completedTodosList.appendChild(listItem);

      // Fetch updated completed tasks and store it in the server
      await fetch('/complete-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: newTask })
      });
    });

    // Add click event to cross button to delete task from remaining list
    crossButton.addEventListener('click', () => {
      listItem.remove();
    });

    // Append buttons to the list item
    listItem.appendChild(tickButton);
    listItem.appendChild(crossButton);

    // Append the list item to the "Remaining Todos" list
    remainingTodosList.appendChild(listItem);

    // Clear input fields
    todoNameInput.value = '';
    todoDescriptionInput.value = '';
  });
});
