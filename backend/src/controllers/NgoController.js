const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ngos = await connection('ngo').select('*');

        return response.json(ngos);
    },

    async create(request, response) {
        const id = generateUniqueId();
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