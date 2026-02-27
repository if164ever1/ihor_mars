console.log("Hello!");

const footer = document.createElement('footer');
const body = document.querySelector('body');
footer.innerText = "© 2026 Ihor's Portfolio";
body.append(footer);


const today = new Date();
const thisYear = today.getFullYear();
const copyright = document.createElement('p');
copyright.innerHTML = "© Ihor" + thisYear;
footer.appendChild(copyright);

const skills = ["JavaScript", "HTML", "CSS", "Python", "GitHub", "React"];

const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement('li');
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}


// Variable for the form
const messageForm = document.getElementsByName('leave_message')[0];

//Hide Messages section initially
const messageSection = document.getElementById('messages');
messageSection.style.display = 'none'; 

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = event.target.usersName.value;
    const email = event.target.usersEmail.value;
    const message = event.target.usersMessage.value;

    const messageList = messageSection.querySelector('ul');
    
    // Show the section now that we have a message
    messageSection.style.display = 'block';

    const newMessage = document.createElement('li');
    newMessage.innerHTML = `
        <a href="mailto:${email}">${name}</a> 
        <span>wrote: ${message}</span>
    `;

    // Create Edit Button 
    const editButton = document.createElement('button');
    editButton.innerText = "edit";
    editButton.type = "button";
    editButton.style.marginLeft = "10px";

    editButton.addEventListener('click', () => {
        // Ask the user for a new message
        const newMessageText = prompt("Edit your message:", message);
        if (newMessageText !== null && newMessageText !== "") {
            // Find the span and update it
            const span = newMessage.querySelector('span');
            span.innerText = `wrote: ${newMessageText}`;
        }
    });

    // Create Remove Button
    const removeButton = document.createElement('button');
    removeButton.innerText = "remove";
    removeButton.type = "button";

    removeButton.addEventListener('click', () => {
        const entry = removeButton.parentNode;
        entry.remove();
        
        // Hide section if list is empty
        if (messageList.children.length === 0) {
            messageSection.style.display = 'none';
        }
    });

    // Append everything
    newMessage.appendChild(editButton);
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    messageForm.reset();
});

// Fetch GitHub Repositories
fetch('https://api.github.com/users/if164ever1/repos')
    .then(response => response.json()) // Pass a function returning the JSON data
    .then(repositories => {
        // Console log the value to see the data structure
        console.log(repositories);

        // DOM Selection for the Projects section and its unordered list
        const projectSection = document.getElementById('Projects');
        const projectList = projectSection.querySelector('ul');

        // Loop over the repositories Array
for (let i = 0; i < repositories.length; i++) {
    const project = document.createElement('li');
    
    // Check if a description exists, otherwise provide fallback text
    const description = repositories[i].description ? repositories[i].description : "A repository hosted on GitHub.";

    // Use innerHTML to construct the exact same structure as your hardcoded projects
    project.innerHTML = `
        <div class="project-header">
            <span class="project-title">${repositories[i].name}</span>
            <span class="project-tech">GitHub Repo</span>
        </div>
        <p class="project-desc">${description}</p>
        <a href="${repositories[i].html_url}" target="_blank" class="project-link">View Project</a>
    `;
    
    projectList.appendChild(project);
}
    })
    .catch(error => {
        // Error handling if the fetch fails
        console.error('Error fetching repositories:', error);
        
        const projectSection = document.getElementById('Projects');
        const projectList = projectSection.querySelector('ul');
        
        const errorMessage = document.createElement('li');
        errorMessage.innerText = 'Could not load GitHub projects at this time.';
        projectList.appendChild(errorMessage);
    });