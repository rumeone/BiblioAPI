require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const app = express();

app.use(express.json());

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter: true})
        app.listen(process.env.PORT, () => {
            console.log(`Server has been started on port ${process.env.PORT}`);
        });
    } catch (e) {
        console.log(e.message);
    }
};

start();


