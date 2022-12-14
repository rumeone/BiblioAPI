const {Book, Reader} = require('../models/models');

class BookController {
    async createBook(req, res) {
        try {
            const {id,title,author,vendorCode,year,numberOfCopies} = req.body;
            const book = await Book.create({id,title,author,vendorCode,year,numberOfCopies});

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

    }
}

module.exports = new BookController();