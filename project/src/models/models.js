const {DataTypes} = require('sequelize');
const sequelize = require('../db');


const Book = sequelize.define('book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    author: {type: DataTypes.STRING, allowNull: false},
    vendorCode: {type: DataTypes.INTEGER, allowNull: false},
    year: {type: DataTypes.DATEONLY, allowNull: false},
    numberOfCopies: {type: DataTypes.INTEGER}
});

const Reader = sequelize.define('reader', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fullName: {type: DataTypes.STRING, allowNull: false},
    birth: {type: DataTypes.DATEONLY, allowNull: false}
});

Reader.hasMany(Book);
Book.belongsTo(Reader);

module.exports = {Book, Reader};