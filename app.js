/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';

import { createItem, getList, completeList, deleteAllList } from './fetch-utils.js';
/* Get DOM Elements */
const addItemForm = document.getElementById('item-form');
const errorMessage = document.getElementById('error-display');
const groceryList = document.getElementById('list');
const removeAllButton = document.getElementById('deleteall');
const removeCompleteButton = document.getElementById('deletepurchased');
/* State */
let lists = [];
let error = null;
/* Events */

async function fetchData() {
    const response = await getList();

    error = response.error;
    lists = response.data;
}

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addItemForm);

    const item = formData.get('item');
    const quantity = formData.get('quantity');

    await createItem(item, quantity);

    if (error) {
        displayError();
    } else {
        lists.push(item);
        addItemForm.reset();
        displayList();
    }
});

window.addEventListener('load', async () => {
    await fetchData();
    if (error) {
        displayError();
    } else {
        displayList();
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

function renderList(item) {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = `${item.quantity} - ${item.item}`;

    if (item.bought) {
        li.classList.add('bought');
    }

    li.append(p);

    return li;
}

async function displayList() {
    await fetchData();
    groceryList.innerHTML = '';

    for (const item of lists) {
        const listEl = renderList(item);
        groceryList.append(listEl);

        listEl.addEventListener('click', async () => {
            await completeList(item.id);
            displayList();
        });
    }
}

removeAllButton.addEventListener('click', async () => {
    await deleteAllList();
    displayList();
});
