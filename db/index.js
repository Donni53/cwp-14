const Actor = require('./actor');
const Film = require('./film');
const FilmActorIm = require('./FilmActor');
const Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

module.exports = (Sequelize, config) => {
    const sequelize = new Sequelize('database', 'username', '',
        {
            host: 'localhost',
            dialect: 'sqlite',
            storage: './tracking',
            define: {
                timestamps: true,
                paranoid: true
            },
            "logging": false
        });

    const Actors = Actor(Sequelize, sequelize);
    const Films = Film(Sequelize, sequelize);
    const FilmActor = FilmActorIm(Sequelize, sequelize);

    Films.belongsToMany(Actors, {as: 'actor', through: FilmActor});
    Actors.belongsToMany(Films, {as: 'film', through: FilmActor});

    return {
        Actors: Actors,
        Films: Films,
        FilmActor: FilmActor,
        sequelize: sequelize,
        Sequelize: Sequelize
    };
};
/*
*


* */