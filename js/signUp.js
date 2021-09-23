'use strict';
import { saveData, getData, displayWrongDetailMes } from './utilities.js';

// variables
const signUpName = document.querySelector('#signUpName');
const signUpEmail = document.querySelector('#signUpEmail');
const signUpPassword = document.querySelector('#signUpPassword');


// for getting data from input fields and save into local storage
let existingUser;
function saveLocalStorageData() {
    const objOfUser = {};
    objOfUser.signUpName = signUpName.value;
    objOfUser.signUpEmail = signUpEmail.value;
    objOfUser.signUpPassword = signUpPassword.value;
    const users = getData('users');
    console.log(users);
    if (users) {
        existingUser = users.map(obj => obj.signUpEmail === signUpEmail.value);
        console.log(existingUser);
        !existingUser[0] && users.push(objOfUser) && saveData('users', users);
    } else {
        saveData('users', [objOfUser]);
    }
}

// for save data into local storage and clear inputs and navigate to login page
document.querySelector('#signUpNewUser').addEventListener('click', function (e) {
    e.preventDefault();
    if (signUpName.value !== '' && signUpEmail.value !== '' && signUpPassword.value !== '') {
        saveLocalStorageData();
        if (!existingUser[0]) {
            signUpName.value = '';
            signUpEmail.value = '';
            signUpPassword.value = '';
            window.location.href = 'index.html';
        } else {
            displayWrongDetailMes('signUp', 'That email is taken. Try another');
        }
    } else {
        displayWrongDetailMes('signUp', 'please fill all inputs');
    }
});