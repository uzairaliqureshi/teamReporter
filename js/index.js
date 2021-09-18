'use strict';
import { eventListener, saveData, getData, displayWrongDetailMes } from './utilities.js';


// variables
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');

// for checking input values and navigate to teams page
const checkingValues = function (e) {
    e.preventDefault();
    const users = getData('users');
    if (users) {
        const userEmail = users.filter(obj => obj.signUpEmail === loginEmail.value);
        const userPassword = users.filter(obj => obj.signUpPassword === loginPassword.value);
        if (userEmail.length, userPassword.length) {
            window.location.href = 'teams.html';
            saveData('currentUser', loginEmail.value);
        } else {
            displayWrongDetailMes('login');
        }
    } else {
        displayWrongDetailMes('login');
    }
};

eventListener('#loginUser', checkingValues);

