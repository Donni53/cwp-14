const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = (Sequelize, sequelize) => {
    return sequelize.define('films', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: Sequelize.STRING},
        rating: {type: Sequelize.DOUBLE, validate: {min:0, max: 10}},
        year:
            {
                type: Sequelize.INTEGER,
                validate:
                    {
                        min: 1889,
                        max: 2017
                    }
            },
        budget: {type: Sequelize.DOUBLE, validate:{min:0}},
        gross: {type: Sequelize.DOUBLE},
        poster: {type: Sequelize.STRING},
        position: {type: Sequelize.INTEGER}
    },
    {
        scopes:
        {
            test: {where: {year: {[Op.gte]:2007}}}
        }
    }
    );
};