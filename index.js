const express = require('express');
const fs = require('fs');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors(
    {origin: '*'}
));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Express server!');
});

// CRUD routes
app.get('/blogs', (req, res) => {
    try {
        if (!fs.existsSync('db.json')) {
          throw new Error('db.json file not found');
        }
        const data = fs.readFileSync('db.json');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing db.json:', error.message);
        return { blogs: [] }; 
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
