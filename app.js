/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';

import { createItem, getList } from './fetch-utils.js';
/* Get DOM Elements */
const addItemForm = document.getElementById('item-form');
const errorMessage = document.getElementById('error-display');
/* State */
let lists = [];
let error = null;
/* Events */
addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addItemForm);

    const item = formData.get('item');
    const quantity = formData.get('quantity');

    await createItem(item, quantity);

    console.log(item, quantity);

    // displayList()
});

window.addEventListener('load', async () => {
    const response = await getList();

    error = response.error;
    lists = response.data;

    if (error) {
        displayError();
    } else {
        // displayList()
    }
});

/* Display Functions */

function displayError() {
    if (error) {
        errorMessage.textContent = error.message;
    } else {
        errorMessage.textContent = null;
    }
}
