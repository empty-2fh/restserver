require( 'dotenv' ).config();

const cors = require( 'cors' );
const express = require( 'express' );

const { dbConnection } = require( '../database/config' );

class Server

{

    constructor()
    
    {

        this.app = express();
        this.port = process.env.PORT;

        // EndPoints

        this.usersRoute = '/api/users';
        this.authRoute = '/auth';

        // DB Connection

        this.connectToDB();

        // Middlewares

        this.middlewares();

        // Routes

        this.routes();

    }

    async connectToDB() 
    
    {

        await dbConnection();

    }

    middlewares()
    
    {

        // CORS

        this.app.use( cors() );

        // Read and parse body

        this.app.use( express.json() );

        // Public directory

        this.app.use( express.static( 'public' ) );

    }

    routes()
    
    {

        this.app.use( this.authRoute, require( '../routes/auth' ) );
        this.app.use( this.usersRoute, require( '../routes/users' ) );

    }

    listen()
    
    {

        this.app.listen( this.port, () => console.log( 'Server running on http://localhost:' + this.port ) );

    }

}

module.exports = Server;