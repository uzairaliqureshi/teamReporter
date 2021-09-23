'use strict';

// imports
import { eventListener, saveData, getData, displayWrongDetailMes, currentUser, checkInputEmails, teamMembers, membersSet } from './utilities.js';

// variables
const teamNameInput = document.getElementById('teamNameInput');
const selectBox = document.getElementById('categories');
const teamMembersInput = document.getElementById('teamMembersInput');
const teamsOwn = document.getElementById('teams-own');
const teamsPartOf = document.getElementById('teams-part-of');

const clearInputs = () => {
    teamNameInput.value = '';
    selectBox.selectedIndex = 0;
    teamMembersInput.value = '';
};

// for navigate
const navigate = (classOrId, naviGateRout) => {
    const teamsDetailsDiv = document.querySelectorAll(classOrId);
    if (teamsDetailsDiv) {
        for (let i = 0; i < teamsDetailsDiv.length; i++) {
            teamsDetailsDiv[i].addEventListener('click', function () {
                window.location.href = naviGateRout;
                saveData('currentTeam', i);
            });
        }
    }
};

// for creating teams div in html
const createTeamsDiv = function () {
    // for teams you own
    const adminDetail = getData(currentUser + 'adminOf');
    if (adminDetail) {
        adminDetail.map((obj) => {
            const team = document.createElement('div');
            team.classList.add('team-detail');
            team.innerHTML =
                `<div class="ownTeam-detail">
              <p>${obj.category}</p>
              <p class="members"><span class="members__head">Members: </span>${obj.teamMembers}</p>
            </div>`;
            teamsOwn.insertAdjacentElement('beforeend', team);
            navigate('.ownTeam-detail', 'ownerView.html');
        });
    }
};
createTeamsDiv();

// for creating teams div in html
const createMembersDiv = function () {
    // for teams Yor are part of
    const memberDetail = getData(currentUser + 'memberOf');
    if (memberDetail) {
        memberDetail.map(obj => {
            const team = document.createElement('div');
            team.classList.add('team-detail');
            team.innerHTML =
                `<div class="partOfTeam-detail">
               <p>${obj.category}</p>
               <p class="members"><span class="members__head">Members: </span>${obj.teamMembers.replace(currentUser, 'You')}</p>
             </div>`;
            teamsPartOf.insertAdjacentElement('beforeend', team);
        });
    }
};
createMembersDiv();

// for saving team details in local Storage
const creatTeam = function () {
    const selectValue = selectBox.options[selectBox.selectedIndex].value;
    const category = selectValue === 'category' ? false : selectValue;
    const booleanValue = checkInputEmails(teamMembersInput);
    if (booleanValue && category) {
        // for teams Yor are part of
        for (let i = 0; i < membersSet.length; i++) {
            const memberData = getData(membersSet[i] + 'memberOf');
            if (memberData) {
                memberData.push({ category, teamMembers });
                saveData(membersSet[i] + 'memberOf', memberData);
            } else {
                saveData(membersSet[i] + 'memberOf', [{ category, teamMembers }]);
            }
        }
        // for teams you own
        const adminData = getData(currentUser + 'adminOf');
        if (adminData) {
            adminData.push({ category, teamMembers });
            saveData(currentUser + 'adminOf', adminData);
            teamsOwn.innerHTML = '';
            createTeamsDiv();
        } else {
            saveData(currentUser + 'adminOf', [{ category, teamMembers }]);
            createTeamsDiv();
        }
        clearInputs();
    } else {
        // for display wrongInfo message
        clearInputs();
        if (!category) displayWrongDetailMes('teams', 'please select category');
        else displayWrongDetailMes('teams', 'type correct email');
    }
};
eventListener('#create', creatTeam);

// navigate to ownerView and memBerView
navigate('.ownTeam-detail', 'ownerView.html');
navigate('.partOfTeam-detail', 'memberView.html');