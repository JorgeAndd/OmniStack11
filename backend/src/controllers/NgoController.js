const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const ngos = await connection('ngo').select('*');

        return response.json(ngos);
    },

    async create(request, response) {
        const id = crypto.randomBytes(4).toString('HEX');
        const { name, email, whatsapp, city, uf } = request.body;

        await connection('ngo').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id });
    },
}