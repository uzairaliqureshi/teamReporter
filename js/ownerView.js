'use strict';

// imports
import { eventListener, saveData, getData, currentUser, checkInputEmails, teamMembers, membersSet, displayWrongDetailMes } from './utilities.js';

// variables
const reportDiv = document.querySelector('.reportDiv');
const settingsDiv = document.querySelector('.settings');
const emailsDiv = document.querySelector('.emailsDiv');
const addMemberInput = document.getElementById('addMemberInput');
const currentTeam = getData('currentTeam');
const teamsData = getData(currentUser + 'adminOf');
let emailsArr;

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
    // const currentTeam = getData('currentTeam');
    teamsData.splice(currentTeam, 1);
    saveData(currentUser + 'adminOf', teamsData);
};

eventListener('.del-btn', deleteTeam);

// for creating members list
emailsDiv.innerHTML = '';
const createMembersList = function () {
    // const currentTeam = getData('currentTeam');
    const emails = teamsData[currentTeam].teamMembers;
    emailsArr = emails.split(',');
    console.log(emailsArr);
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
        addMemberInput.value = '';
        // const adminDetail = getData(currentUser + 'adminOf')
        // adminDetail[currentTeam].teamMembers
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