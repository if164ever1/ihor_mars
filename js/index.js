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