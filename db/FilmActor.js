module.exports = (Sequelize, sequelize) => {
    return sequelize.define('filmActor', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
    });
};