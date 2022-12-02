const { User, Genre, Movie, Cast, sequelize } = require('../models');
const slugify = require('slug');

class MovieController {
    static async readMovies(req, res, next) {
        try {
            let movies = await Movie.findAll({
                include: [User, Genre, Cast]
            });
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async readMovieById(req, res, next) {
        try {
            console.log('read Movie')
            let id = req.params.id;
            let movieFound = await Movie.findByPk(id, {
                include: [User, Genre, Cast]
            });
            if (!movieFound) {
                throw { name: 'Movie not found' };
            }
            res.status(200).json(movieFound);
        } catch (error) {
            console.log(error)
            if (error.name === 'Movie not found') {
                res.status(400).json({ message: 'Movie not found' });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    };

    static async createMovie(req, res, next) {
        const t = await sequelize.transaction();
        try {
            console.log('through create movie')
            let { title, synopsis, trailerUrl, imgUrl, rating, genreId, Casts } = req.body;
            if (!genreId) {
                genreId = 1
            }
            // let access_token = req.headers.access_token;
            // console.log(access_token)
            // if (!access_token) {
            //     throw { name: 'Unauthorized' };
            // }
            // let payload = verifyToken(access_token);
            // let user = await User.findByPk(payload.id);
            // if (!user) {
            //     throw { name: 'Unauthorized' };
            // }
            let authorId = 1 //user.id;
            let slug = slugify(title);
            let movieCreated = await Movie.create({ title, slug, synopsis, trailerUrl, imgUrl, rating, genreId, authorId }, {
                transaction: t
            });
            console.log(Casts)
            console.log(movieCreated)
            console.log(movieCreated.id)
            let castCreated = await Promise.all(Casts.map((cast) => {
                let { name, profilePict } = cast;
                Cast.create({ movieId: movieCreated.id, name, profilePict });
            }), { transaction: t });
            console.log(castCreated)
            await t.commit();
            res.status(201).json(movieCreated);
        } catch (error) {
            await t.rollback();
            console.log(error)
            // if(error.name === 'Unauthorized') {
            //     res.status(401).json({message: 'Unauthorized'});
            // } else if(error.name === 'JsonWebTokenError') {
            //     res.status(401).json({message: 'Invalid token'});
            // } else {
                res.status(500).json({message: 'Internal server error'});
            // }
        }
    };

    static async editMovieById(req, res, next) {
        try {
            console.log('edit movie controller')
            let id = req.params.id;
            let { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
            let movieFound = await Movie.findByPk(id);
            if (!movieFound) {
                throw { name: 'Movie not found' };
            }
            let movieUpdated = await movieFound.update({ title, synopsis, trailerUrl, imgUrl, rating, genreId })
            res.status(200).json(movieUpdated);
        } catch (error) {
            console.log(error)
            if (error.name === 'Movie not found') {
                res.status(400).json({ message: 'Movie not found' });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    };

    static async deleteMovieById(req, res, next) {
        try {
            let id = req.params.id;
            let movieFound = await Movie.findByPk(id);
            if (!movieFound) {
                throw { name: 'Movie not found' };
            }
            await Movie.destroy({
                where: { id }
            });
            res.status(200).json({ message: `Movie id ${id} deleted` });
        } catch (error) {
            console.log(error)
            if (error.name === 'Movie not found') {
                res.status(400).json({ message: 'Movie not found' });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    };
};

module.exports = MovieController;