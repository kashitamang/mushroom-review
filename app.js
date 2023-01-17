// import functions and grab DOM elements
import { renderMushroom, renderFriend } from './render-utils.js';

const friendsEl = document.querySelector('.friends');
const friendInputEl = document.getElementById('friend-input');
const mushroomsEl = document.querySelector('.mushrooms');
const addMushroomButton = document.getElementById('add-mushroom-button');
const addFriendButton = document.getElementById('add-friend-button');
// initialize state

let mushroomCount = 3;

const friendData = [
    {
        name: 'Erich',
        satisfaction: 2,
    },
    {
        name: 'Sarah',
        satisfaction: 3,
    },
    {
        name: 'Missael',
        satisfaction: 1,
    },
    {
        name: 'Soraya',
        satisfaction: 2,
    },
];

addMushroomButton.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        alert('found a mushroom!');

        mushroomCount++;
        displayMushrooms();
    } else {
        alert('no luck!');
    }
});

addFriendButton.addEventListener('click', () => {
    // get the name from the input
    const newFriendName = friendInputEl.value;
    // create a new friend object
    const newFriend = {
        name: newFriendName || `friend ${Math.floor(Math.random() * 500)}`,
        satisfaction: Math.ceil(Math.random() * 3),
    };
    // push it into the friends state array, passed in as an argument
    friendData.push(newFriend);
    // clear out the input element
    friendInputEl.value = '';
    // clear out and display all the friends (use a function here)
    displayFriends();

    console.log('new friends name:', newFriendName);
    console.log(friendData);
    console.log(newFriend.satisfaction);
});

function displayFriends() {
    // clear out the friends in DOM
    friendsEl.textContent = '';
    // for each friend in state . . .
    for (let friend of friendData) {
        // use renderFriend to make a friendEl
        const friendEl = renderFriend(friend);
        // this is a clickable list, so . . .
        //     add an event listener to each friend
        friendEl.addEventListener('click', () => {
            // and if the friend's satisfaction level is below 3 and you have mushrooms left
            if (friend.satisfaction < 3 && mushroomCount > 0) {
                // increment the friends satisfaction and decrement your mushrooms
                friend.satisfaction++;
                mushroomCount--;
                // clear out and display the updated friends and mushrooms (hint: displayFriends, displayMushrooms)
                displayFriends();
                displayMushrooms();
            } else if (friend.satisfaction === 3) {
                alert('dont be greedy');
                return;
            } else alert('you might want to hunt for more mushrooms...');
        });
        // append the friendEl to the friends list in DOM
        friendsEl.append(friendEl);
    }
}

function displayMushrooms() {
    // clear out the mushroom div
    mushroomsEl.textContent = '';

    for (let i = 0; i < mushroomCount; i++) {
        // for each mushroom in your mushroom state, render and append a mushroom
        const mushroomEl = renderMushroom(i);
        mushroomsEl.append(mushroomEl);
    }
}

displayFriends();
displayMushrooms();
