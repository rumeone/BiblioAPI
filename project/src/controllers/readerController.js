const {Book, Reader} = require('../models/models');

class ReaderController {
    async createReader(req, res) {
        try {
            const {fullName, birth} = req.body;
            const reader = await Reader.create({fullName, birth});

            return res.json({reader});
        } catch (e) {
            console.log("user creation error: ", e.message)
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
            return res.status(400).json({message: 'User change error'});
        }
    }
}

module.exports = new ReaderController();