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


// get data
const getData = () => {
    try {
      const data = fs.readFileSync('db.json');
      console.log(data)
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading or parsing db.json:', error);
      throw error;
    }
};

// CRUD routes
app.get('/blogs', (req, res) => {
    try {
        const data = getData();
    res.json(data.blogs);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
