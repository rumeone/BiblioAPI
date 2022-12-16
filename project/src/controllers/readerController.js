const {Book, Reader, ReaderBook} = require('../models/models');
const {json} = require("express");
const sequelize = require('../db');

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
            console.log(book.numberOfCopies);
            await book.update({numberOfCopies: book.numberOfCopies - 1});
            return res.json(`Reader with id = ${idReader} book added ${book.title}`)
        } catch (e) {
            console.log(e.message);
            return res.status(400).json({message: 'Error issuing a book to a reader'});
        }
    };
}

module.exports = new ReaderController();