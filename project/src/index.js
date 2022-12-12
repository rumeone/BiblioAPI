require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const start = async() => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`Server has been started on port ${process.env.PORT}`);
        });
    } catch (e) {
        console.log(e.message);
    }
};

start();


