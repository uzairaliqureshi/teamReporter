'use strict';

// imports
import { eventListener, saveData, getData, currentUser, checkInputEmails, teamMembers, membersSet, displayWrongDetailMes } from './utilities.js';

// variables
const membersSelectBox = document.getElementById('membersSelectBox');
const interrogation = document.querySelector('.interrogation');
const reportDiv = document.querySelector('.reportDiv');
const settingsDiv = document.querySelector('.settings');
const emailsDiv = document.querySelector('.emailsDiv');
const addMemberInput = document.getElementById('addMemberInput');
const questionInput = document.querySelectorAll('#questionInput');
const currentTeam = getData('currentTeam');
const teamsData = getData(currentUser + 'adminOf');
let emailsArr;

// for creating reports members dropdown and question, Ans Div
let memberArr = teamsData[currentTeam].teamMembers;
let questions = teamsData[currentTeam].questionInput;
memberArr = memberArr.split(',');
for (let i = 0; i < memberArr.length; i++) {
    const input = document.createElement("option");
    input.value = memberArr[i];
    input.innerText = memberArr[i];
    membersSelectBox.insertAdjacentElement('beforeend', input);
    // creating question, Ans Div
    if (questions) {
        const question = questions.split(',');
        const quesAnsDiv = document.createElement("div");
        quesAnsDiv.classList.add('quesAnsDiv');
        quesAnsDiv.innerHTML =
            `<div class="namDate">
           ${memberArr[i]}:
        </div>
        <div class="quesAns">
            <div class="ques">Q.${question[0]}</div>
            <div class="ans">A. Nothing</div>
            <div class="ques">Q.${question[1]}</div>
            <div class="ans">A. Nothing</div>
            <div class="ques">Q.${question[2]}</div>
            <div class="ans">A. Nothing</div>
        </div>`;
        interrogation.insertAdjacentElement('beforeend', quesAnsDiv);
    }
}

// for witch between rep and settings
const forSwitch = (addBTnClass, remBTnClass) => {
    document.querySelector(addBTnClass).addEventListener('click', function () {
        this.classList.add('borderBottom');
        document.querySelector(remBTnClass).classList.remove('borderBottom');
        if (addBTnClass == '.btn--Set') {
            reportDiv.classList.add('hide');
            settingsDiv.classList.remove('hide');
        } else {
            settingsDiv.classList.add('hide');
            reportDiv.classList.remove('hide');
        }
    });
};
forSwitch('.btn--Set', '.btn--Rep');
forSwitch('.btn--Rep', '.btn--Set');

// for navigate 
const goBack = () => window.location.href = 'teams.html';
eventListener('.btn--back', goBack);

// for delete teams
const deleteTeam = () => {
    teamsData.splice(currentTeam, 1);
    saveData(currentUser + 'adminOf', teamsData);
};

eventListener('.del-btn', deleteTeam);

// for creating members list
emailsDiv.innerHTML = '';
const createMembersList = function () {
    const emails = teamsData[currentTeam].teamMembers;
    emailsArr = emails.split(',');
    emailsArr.map(email => {
        const memBers = document.createElement('div');
        memBers.innerHTML =
            `<div class="emailDiv">
            <div class="">${email}<a class="btn btn-cross">&#215;</a></div>
         </div>`;
        emailsDiv.insertAdjacentElement('beforeend', memBers);
    });
};
createMembersList();

// for add new member to team
function addMembers() {
    const booleanValue = checkInputEmails(addMemberInput);
    if (booleanValue) {
        membersSet.map(email => {
            const memBers = document.createElement('div');
            memBers.innerHTML =
                `<div class="emailDiv">
            <div class="">${email}<a class="btn btn-cross">&#215;</a></div>
         </div>`;
            emailsDiv.insertAdjacentElement('beforeend', memBers);
        });
        // for teams Yor are part of
        for (let i = 0; i < membersSet.length; i++) {
            const memberData = getData(membersSet[i] + 'memberOf');
            const category = teamsData[currentTeam].category;
            if (memberData) {
                memberData[currentTeam].teamMembers = teamMembers;
                saveData(membersSet[i] + 'memberOf', memberData);
            } else {
                saveData(membersSet[i] + 'memberOf', [{ category, teamMembers }]);
            }
        }
        addMemberInput.value = '';
        const newEmails = [...emailsArr, ...membersSet];
        const newEmailsStr = newEmails.join();
        teamsData[currentTeam].teamMembers = newEmailsStr;
        saveData(currentUser + 'adminOf', teamsData);
    } else {
        displayWrongDetailMes('settingAndReport', 'email is not exist');
        addMemberInput.value = '';
    }
}
eventListener('#addMemberBtn', addMembers);

// for saving questions input values
const getQuesInpValue = () => {
    if (questionInput[0].value && questionInput[1].value && questionInput[2].value) {
        const value1 = questionInput[0].value;
        const value2 = questionInput[1].value;
        const value3 = questionInput[2].value;
        teamsData[currentTeam].questionInput = `${value1}, ${value2}, ${value3}`;
        saveData(currentUser + 'adminOf', teamsData);
    }
};
eventListener('#saveChanges', getQuesInpValue);


