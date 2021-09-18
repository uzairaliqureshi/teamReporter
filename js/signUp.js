'use strict';
import { saveData, getData, displayWrongDetailMes } from './utilities.js';

// variables
const signUpName = document.querySelector('#signUpName');
const signUpEmail = document.querySelector('#signUpEmail');
const signUpPassword = document.querySelector('#signUpPassword');


// for getting data from input fields and save into local storage
function saveLocalStorageData() {
    const objOfUser = {};
    objOfUser.signUpName = signUpName.value;
    objOfUser.signUpEmail = signUpEmail.value;
    objOfUser.signUpPassword = signUpPassword.value;
    const users = getData('users');
    if (users) {
        users.push(objOfUser);
        saveData('users', users);
    } else {
        saveData('users', [objOfUser]);
    }
}

// for save data into local storage and clear inputs and navigate to login page
document.querySelector('#signUpNewUser').addEventListener('click', function (e) {
    e.preventDefault();
    if (signUpName.value !== '' && signUpEmail.value !== '' && signUpPassword.value !== '') {
        saveLocalStorageData();
        signUpName.value = '';
        signUpEmail.value = '';
        signUpPassword.value = '';
        window.location.href = 'index.html';
    } else {
        displayWrongDetailMes('signUp');
    }
});