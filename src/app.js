function changeTheme() {
    document.body.classList.toggle("__dark")
}

document.addEventListener("DOMContentLoaded", function (event) {
    document.querySelector('.details__dark-mode-button').addEventListener('click', changeTheme);
});

class Skill {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    updateValue(value) {
        this.value = value;
    }
}

const skillsContainer = document.querySelector('.coding-skills-panel__skills-list');
let skillsList = [
    new Skill('Java', 40),
    new Skill('Kotlin', 30),
    new Skill('C', 15),
    new Skill('JavaScript', 5),
];

function init() {
    const addButton = document.querySelector('.add-panel__add-button');
    addButton.addEventListener("click", () => addSkill());
    redrawSkillsPanel();
}

function addSkill() {
    let nameInput = document.querySelector('.add-panel__skill-name');
    let valueInput = document.querySelector('.add-panel__skill-value');
    let isValid = true;
    if (nameInput.value === "") {
        alert("Incorrect skill name!");
        isValid = false;
    }
    if (valueInput.value === "" || valueInput.value < 0 || valueInput.value > 100) {
        alert("Incorrect skill value!");
        isValid = false;
    }
    for (let i = 0; i < skillsList.length; i++) {
        if (skillsList[i].name === nameInput.value) {
            if (skillsList[i].value === valueInput.value) {
                alert("A skill with the same value already exists");
                isValid = false;
            }
            skillsList[i].updateValue(valueInput.value);
            isValid = false;
            redrawSkillsPanel();
        }
    }
    if (isValid) {
        skillsList.push(new Skill(nameInput.value, valueInput.value));
        redrawSkillsPanel();
    }
    nameInput.value = "";
    valueInput.value = "";
}

function deleteSkill(skill) {
    let index = skillsList.indexOf(skill);
    if (index === -1) {
        return;
    }
    skillsList.splice(index, 1);
    redrawSkillsPanel();
}

function redrawSkillsPanel() {
    skillsContainer.innerHTML = '<h2>Coding Skills</h2>';
    for (let i = 0; i < skillsList.length; i++) {
        const skill = document.createElement("section");
        skill.classList.add("coding-skills-list__skill-item-" + skillsList[i].name);
        skill.innerHTML =
            `<h3>${skillsList[i].name}</h3>
                <progress class="coding-skills-list__skill-item-${skillsList[i].name}_progress" 
                    max="100" value=${skillsList[i].value}>
                </progress>
                <button class="coding-skills-list__skill-item-${skillsList[i].name}_minus-button">-</button>`;
        skillsContainer.appendChild(skill);
        let deleteButton = document.querySelector('.coding-skills-list__skill-item-' + skillsList[i].name + '_minus-button');
        deleteButton.addEventListener("click", () => deleteSkill(skillsList[i]));
    }
}

init();