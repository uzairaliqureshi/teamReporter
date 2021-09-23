'use strict';

// for event listener
const eventListener = (classOrId, fn) => document.querySelector(classOrId).addEventListener('click', fn);

// for creating arrOfObj in localStorage of user
const saveData = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

const getData = (key) =>
  JSON.parse(localStorage.getItem(key));

// for creating current user
const currentUser = getData('currentUser');

// for display wrongInfo message
const displayWrongDetailMes = function (id, mes) {
  const container = document.getElementById(id);
  const wrongInfoDiv = document.createElement('div');
  wrongInfoDiv.classList.add('wrongInfoMessage');
  wrongInfoDiv.innerHTML =
    `<div class="create-team">
          <div class="heading">
            ${mes}
          </div>
          <div class="btn-div">
             <a id="goBack" class="btn btn--green">OK</a>
          </div>
        </div>`;
  container.insertAdjacentElement('beforeend', wrongInfoDiv);
  const gotoTeamsPage = () => wrongInfoDiv.remove();
  eventListener('#goBack', gotoTeamsPage);
};


let teamMembers;
let membersSet;
// for checking own and multiple emails in type members email input
const checkInputEmails = function (input) {
  const members = input.value;
  const users = getData('users');
  const membersArr = members.split(' ');
  const membersSet1 = new Set(membersArr);
  membersSet1.delete(currentUser);
  membersSet = [...membersSet1];
  const arr = [];
  membersSet.filter(email => {
    users.filter(obj => {
      if (obj.signUpEmail == email) arr.push(true);
    });
  });
  teamMembers = membersSet.join();
  const afterCheckingEmails = arr.length === membersSet.length && arr.length > 0 ? true : false;
  return afterCheckingEmails;
};

export { eventListener, saveData, getData, displayWrongDetailMes, currentUser, checkInputEmails, teamMembers, membersSet };