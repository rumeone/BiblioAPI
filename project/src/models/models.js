const {DataTypes} = require('sequelize');
const sequelize = require('../db');


const Book = sequelize.define('Book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    author: {type: DataTypes.STRING, allowNull: false},
    vendorCode: {type: DataTypes.INTEGER, allowNull: false},
    year: {type: DataTypes.DATEONLY, allowNull: false},
    numberOfCopies: {type: DataTypes.INTEGER}
});

const Reader = sequelize.define('Reader', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fullName: {type: DataTypes.STRING, allowNull: false},
    birth: {type: DataTypes.DATEONLY, allowNull: false}
});

const ReaderBook = sequelize.define('ReaderBook', {
});

Reader.belongsToMany(Book, {through: ReaderBook});
Book.belongsToMany(Reader, {through: ReaderBook});


module.exports = {Book, Reader, ReaderBook};