const {Book, Reader, ReaderBook} = require('../models/models');

class BookController {
    async createBook(req, res) {
        try {
            const {title,author,vendorCode,year,numberOfCopies} = req.body;
            const book = await Book.create({title,author,vendorCode,year,numberOfCopies});

            return res.json({book});
        } catch (e) {
            console.log("Book creation error: ", e.message);
            res.status(400).json({message: 'Creation error'});
        }
    };

    async changeBook(req, res) {
        try {

            const book = await Book.findByPk(req.body.id);
            if (!book) {
                return res.status(400).json({message: 'Book does not exist'});
            }
            await book.update({
                title: req.body.title,
                author: req.body.author,
                vendorCode: req.body.vendorCode,
                year: req.body.year,
                numberOfCopies: req.body.numberOfCopies
            });
            return res.json({book});
        } catch (e) {
            console.log(e.message);
            return res.status(400).json({message: 'Book change error'});
        }
    };

    async deleteBook(req, res) {
        try {
            const book = await Book.findByPk(req.body.id);
            if (!book) {
                return res.status(400).json({message: 'Book does not exist'});
            }
            await book.destroy({
                where: {
                    id: req.body.id
                }
            });
            return res.json(`The book "${book.title}" has been removed`);
        } catch (e) {
            console.log(e.message);
            return res.status(400).json({message: 'Error deleting a book'});
        }
    };

    async getBookDataById(req, res) {
        try {
            const {id} = req.params;
            console.log(id);
            const book = await Book.findOne({
                where: {id: id}
            });
            if(!book) {
                return res.status(400).json({message: 'Book does not exist'});
            }
            return res.json(book);
        } catch (e) {
            console.log(e.message);
            return res.status(400).json({message: 'Book data retrieval error'});
        }
    };

    async getBookDataByName(req, res) {
        try {
            const {title} = req.body;
            const {Op} = require('sequelize');
            const book = await Book.findOne({
                where: {
                    title: {
                        [Op.substring] : title
                    }
                }
            });
            if(!book) {
                return res.status(400).json({message: 'Book does not exist'});
            }
            return res.json(book);
        } catch (e) {
            console.log(e.message);
            return res.status(400).json({message: 'Book data retrieval error'});
        }
    };

    async getAvailableBooks(req, res) {
        try {
            const {Op} = require('sequelize');
            const books = await Book.findAll({
                attributes: ['id','title'],
                where: {
                    numberOfCopies: {
                        [Op.gte]: 1
                    }
                }
            });
            if(!books) {
                return res.status(400).json({message: 'Book does not exist'});
            }
            console.log(books);
            return res.json(books);
        } catch (e) {
            console.log(e.message);
            return res.status(400).json({message: 'Book data retrieval error'});
        }
    };

    async getIssuedBook(req, res) {
        try {
            const issuedBook = await ReaderBook.findAll({
                attributes: ['BookId']
            });
            if(!issuedBook) {
                return res.json("No books released");
            }
            return res.json(issuedBook);
        } catch (e) {
            console.log(e.message);
            return res.status(400).json({message: 'Book data retrieval error'});
        }
    }
}

module.exports = new BookController();