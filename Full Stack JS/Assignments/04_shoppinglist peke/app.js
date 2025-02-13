const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Use built-in Express middleware for form data parsing

let items = [];
let wishList = [];
let purchasedList = [];

app.get('/', (req, res) => {
    res.render('index', { items, wishList, purchasedList });
});

// Handle adding items with action (either wish list or purchased list)
app.post('/add-item', (req, res) => {
    const item = req.body.item;
    const action = req.body.action;

    if (item) {
        items.push(item);

        // Add the item to the appropriate list based on action
        if (action === 'wishlist') {
            wishList.push(item);
        } else if (action === 'purchased') {
            purchasedList.push(item);
        }
    }
    res.redirect('/');
});

// Handle transferring an item between the Wish List and Purchased List
app.post('/transfer-item', (req, res) => {
    const index = parseInt(req.body.index);
    const list = req.body.list;

    // If the item is in the Wish List, transfer it to Purchased List
    if (list === 'wishlist') {
        const item = wishList.splice(index, 1)[0];
        if (item) {
            purchasedList.push(item);
        }
    }
    // If the item is in the Purchased List, transfer it to Wish List
    else if (list === 'purchased') {
        const item = purchasedList.splice(index - wishList.length, 1)[0];
        if (item) {
            wishList.push(item);
        }
    }

    res.sendStatus(200); // Send success response
});

// Handle deleting an item from any list
app.post('/delete-item', (req, res) => {
    const index = parseInt(req.body.index);
    
    // Delete item from Wish List
    if (index < wishList.length) {
        wishList.splice(index, 1);
    }
    // Delete item from Purchased List
    else if (index - wishList.length < purchasedList.length) {
        purchasedList.splice(index - wishList.length, 1);
    }

    res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
