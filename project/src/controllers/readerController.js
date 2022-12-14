const {Book, Reader} = require('../models/models');

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
}

module.exports = new ReaderController();