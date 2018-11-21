module.exports = (Sequelize, sequelize) => {
    return sequelize.define('actors', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: Sequelize.STRING(50)},
        birth: {type: Sequelize.DATEONLY},
        countFilms: {type: Sequelize.INTEGER},
        liked: {type: Sequelize.INTEGER},
        photo: {type: Sequelize.STRING}
    });
};