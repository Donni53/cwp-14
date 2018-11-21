const config = require('./config.json');
const Promise = require('bluebird');
const Sequelize = require('sequelize');
const db = require('./db')(Sequelize, config);

module.exports = db;

db.sequelize.addHook('beforeBulkCreate', () => {
    console.log('beforeCreate');
});
db.sequelize.addHook('afterBulkCreate', () => {
    console.log('afterCreate');
});

q();

async function q()
{
    await Promise.all([db.Actors.sync({force: true}), db.Films.sync({force: true}), db.FilmActor.sync({force: true}) ]);

    await db.Films. bulkCreate([
                            {title: 'Test 1', rating: 5.3, year: 1998, budget: 500, gross: 5000, poster: '123', position: 50},
                            {title: 'Test 2', rating: 6.3, year: 2008, budget: 500, gross: 5000, poster: '123', position: 52},
                            {title: 'Test 3', rating: 9.3, year: 2012, budget: 500, gross: 5000, poster: '123', position: 2}
                        ], {validate: true});

    await db.Actors.bulkCreate([
                                  {name: 'Actor 1', birth: new Date('11-11-1959'), countFilms: 3, liked: 2, photo: '1'},
                                  {name: 'Actor 2', birth: new Date('11-11-1959'), countFilms: 3, liked: 2, photo: '2'},
                                  {name: 'Actor 3', birth: new Date('11-11-1959'), countFilms: 40, liked: 12, photo: '3'}
                              ], {validate: true});

    await db.FilmActor.bulkCreate([
                                        {filmId: 1, actorId: 1},
                                        {filmId: 2, actorId: 1},
                                        {filmId: 1, actorId: 3}
                                    ]);

    await db.Actors.update({liked: 0}, {where:{countFilms: 3}});
    console.log(await db.Actors.findAll());

    await db.Actors.destroy({where:{liked: 0}});
    console.log(await db.Actors.findAll());

    let films = await db.Films.findById(2, {
        include: [{
            model: db.Actors,
            as: 'actor'
        }]
    });

    console.log(films.actor);

    console.log(await db.Films.scope('test').findAll());

    await db.sequelize.transaction().then(function (t) {
        return db.Actors.update({
                                    liked: 0
                              }, {transaction: t, where: {}}).then(function ()
                              {
                                  setTimeout(function ()
                                             {
                                                 return t.rollback();
                                             }, 10000);
                              })});

    // sequelize init
    // sequelize model:generate --name film --attributes title:string,rating:float,budget:integer,gross:integer,poster:string
    // sequelize model:generate --name actor --attributes name:string,birth:string,count_films:integer,liked:integer,photo:string
    // sequelize db:migrate
    // sequelize db:migrate:undo
    //
}
