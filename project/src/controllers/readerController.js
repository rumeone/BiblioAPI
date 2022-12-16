const {Book, Reader, ReaderBook} = require('../models/models');
const {json} = require("express");
const sequelize = require('../db');
const {stringify} = require("nodemon/lib/utils");

class ReaderController {
    async createReader(req, res) {
        try {
            const {fullName, birth} = req.body;
            if(!fullName || !birth) {
                console.log("Reader creation error");
                res.status(400).json({message: 'No data'});
            }
            const reader = await Reader.create({fullName, birth});

            return res.json({reader});
        } catch (e) {
            console.log("Reader creation error: ", e.message)
            res.status(400).json({message: 'Creation error'});
        }
    };

    async changeReader(req, res) {
        try {
            const reader = await Reader.findByPk(req.body.id);
            if (!reader) {
                return res.status(400).json({message: 'Reader does not exist'});
            }
            await reader.update({fullName: req.body.fullName, birth: req.body.birth});
            return res.json({reader});
        } catch (e) {
            console.log(e.message);
            return res.status(400).json({message: 'Reader change error'});
        }
    }

    async deleteReader(req,res) {
        try {
            const reader = await Reader.findByPk(req.body.id);
            if (!reader) {
                return res.status(400).json({message: 'Reader does not exist'});
            }
            await reader.destroy({
                where: {
                    id: req.body.id
                }
            });
            return res.json(`The user ${reader.fullName} has been removed`);
        } catch (e) {
            console.log(e.message);
            return res.status(400).json({message: 'Error deleting user'});
        }
    };

    async issueBook(req, res) {
        try {
            const {idBook, idReader} = req.body;
            const book = await Book.findByPk(idBook);
            const reader = await Reader.findByPk(idReader);
            if (!reader || !book) {
                return res.status(400).json({message: 'Reader does not exist'});
            }
            reader.addBooks(idBook);
            await book.update({numberOfCopies: book.numberOfCopies - 1});
            return res.json(`Reader with id = ${idReader} book added ${book.title}`)
        } catch (e) {
            console.log(e.message);
            return res.status(400).json({message: 'Error issuing a book to a reader'});
        }
    };

    async returnBook(req, res) {
        try {
            const {idReader, idBook} = req.body;
            const book = await ReaderBook.findOne({
                where: {
                    BookId: idBook
                }
            });
            const reader = await ReaderBook.findOne({
                where: {
                    ReaderId: idReader
                }
            });
            if (!reader || !book) {
                return res.status(400).json({message: 'Reader or Book does not exist'});
            }
            await ReaderBook.destroy({
                where: {
                    ReaderId: idReader,
                    BookId: idBook
                }
            });
            await book.update({numberOfCopies: book.numberOfCopies + 1});
            return res.json(`Reader with id = ${idReader} return the book ${idBook}`)
        } catch (e) {
            console.log(e.message);
            return res.status(400).json({message: 'Error returning a book to a reader'});
        }
    };

    async getDataById(req, res) {
        try {
            const {id} = req.params;
            console.log(id);
            const reader = await Reader.findOne({
                where: {
                    id: id
                }
            });
            if(!reader) {
                return res.status(400).json({message: 'Reader does not exist'});
            }
            return res.json(reader);
        } catch (e) {
            console.log(e.message);
            return res.status(400).json({message: 'Reader data retrieval error'});
        }
    };

    async getDataByName(req, res) {
        try {
            const {fullName} = req.body;
            const {Op} = require('sequelize');
            const reader = await Reader.findOne({
                attributes: ['id', 'fullName', 'birth'],
                where: {
                    fullName: {
                        [Op.substring]: fullName
                    }
                }
            });
            const bookReader = await ReaderBook.findAll({
                attributes: ['BookId'],
                where: {
                    ReaderId: reader.id
                }
            });
            const result = {
                reader,
                bookReader
            };
            if(!reader) {
                return res.status(400).json({message: 'Reader does not exist'});
            }
            return res.json(result);
        } catch (e) {
            console.log(e.message);
            return res.status(400).json({message: 'Reader data retrieval error'});
        }
    };
}

module.exports = new ReaderController();