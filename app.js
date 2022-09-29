/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';

import { createItem } from './fetch-utils.js';
/* Get DOM Elements */
const addItemForm = document.getElementById('item-form');
/* State */

/* Events */
addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addItemForm);

    const item = formData.get('item');
    const quantity = formData.get('quantity');

    await createItem(item, quantity);

    console.log(item, quantity);
});
/* Display Functions */
