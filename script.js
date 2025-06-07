 
    // Store tasks for each day
    const tasks = {
      Sunday: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: []
    };

    // Function to show task form
    function showTaskForm(day) {
      const dayCard = document.getElementById(day);
      
      // Remove any existing form first
      const existingForm = dayCard.querySelector('.task-form');
      if (existingForm) {
        dayCard.removeChild(existingForm);
        return;
      }
      
      // Create form element
      const form = document.createElement('div');
      form.className = 'task-form';
      form.innerHTML = `
        <div class="time-selector">
          <select id="${day}-hour">
            ${Array.from({length: 24}, (_, i) => `<option value="${i}" ${i === 9 ? 'selected' : ''}>${i.toString().padStart(2, '0')}</option>`).join('')}
          </select>
          <span>:</span>
          <select id="${day}-minute">
            ${Array.from({length: 60}, (_, i) => `<option value="${i}" ${i === 0 ? 'selected' : ''}>${i.toString().padStart(2, '0')}</option>`).join('')}
          </select>
        </div>
        <input type="text" id="${day}-desc" placeholder="Task description">
        <div class="form-buttons">
          <button class="save-btn" onclick="addTask('${day}')">Save</button>
          <button class="cancel-btn" onclick="this.parentElement.parentElement.remove()">Cancel</button>
        </div>
      `;
      
      // Insert after the add task button
      dayCard.insertBefore(form, document.getElementById(`${day}-tasks`));
    }

    // Function to add a new task
    function addTask(day) {
      const hour = document.getElementById(`${day}-hour`).value.padStart(2, '0');
      const minute = document.getElementById(`${day}-minute`).value.padStart(2, '0');
      const description = document.getElementById(`${day}-desc`).value;
      
      if (!description) {
        alert("Please enter a task description");
        return;
      }
      
      // Create new task object
      const newTask = {
        time: `${hour}:${minute}`,
        description: description,
        completed: false
      };
      
      // Add to the day's tasks
      tasks[day].push(newTask);
      
      // Remove the form
      const form = document.querySelector(`#${day} .task-form`);
      if (form) form.remove();
      
      // Update the display
      showTasks(day);
    }

    // Function to show tasks for a day
   function showTasks(day) {
  const tasksList = document.getElementById(`${day}-tasks`);
  tasksList.innerHTML = '';

  tasks[day].forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task-item';

    taskElement.innerHTML = `
      <div class="task-content">
        <div class="task-time">
          <input type="checkbox" onchange="toggleComplete('${day}', ${index})" ${task.completed ? 'checked' : ''}>
          ${task.time}
        </div>
        <div class="task-desc ${task.completed ? 'completed' : ''}">${task.description}</div>
      </div>
      <div class="task-controls">
        <button onclick="moveTask('${day}', ${index}, -1)">↑</button>
        <button onclick="moveTask('${day}', ${index}, 1)">↓</button>
        <button onclick="deleteTask('${day}', ${index})">🗑️</button>
      </div>
    `;

    tasksList.appendChild(taskElement);
  });
}

function toggleComplete(day, index) {
  tasks[day][index].completed = !tasks[day][index].completed;
  showTasks(day);
}

function deleteTask(day, index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks[day].splice(index, 1);  // remove task at index
    showTasks(day);  // refresh display
  }
}

    // Function to move tasks up/down
    function moveTask(day, index, direction) {
      const newIndex = index + direction;
      
      if (newIndex >= 0 && newIndex < tasks[day].length) {
        // Swap tasks
        const temp = tasks[day][index];
        tasks[day][index] = tasks[day][newIndex];
        tasks[day][newIndex] = temp;
        
        // Update display
        showTasks(day);
      }
    }
 