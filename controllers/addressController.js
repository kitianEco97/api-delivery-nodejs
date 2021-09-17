const Address = require('../models/address');

module.exports = {

    async findByUser(req, res, next) {

        try {
            const id_user = req.params.id_user;
            const data = await Address.findByUser(id_user);
            console.log(`Address ${ JSON.stringify(data)}`);
            return res.status(201).json(data);            
        } catch (error) {
            console.error(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las direcciones',
                error: error,
                success: false
            })
        }

    },

    async create(req, res, next) {
        try {

            const address = req.body;
            const data = await Address.create(address);

            return res.status(201).json({
                success: true,
                message: 'la dirección se creo correctamente ',
                data: data.id
            });
            
        } catch (error) {
            console.error(error);
            return res.status(501).json({
                success: false,
                message: 'hubo un error creando la dirección',
                error: error
            });
        }
    }

}