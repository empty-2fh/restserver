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

        this.endpoints = 
        
        {

            auth       : '/auth',
            categories : '/api/categories',
            search     : '/api/search',
            products   : '/api/products', 
            users      : '/api/users'

        }

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

        this.app.use( this.endpoints.auth, require( '../routes/auth' ) );
        this.app.use( this.endpoints.categories, require( '../routes/categories' ) );
        this.app.use( this.endpoints.products, require( '../routes/products' ) );
        this.app.use( this.endpoints.search, require( '../routes/search' ) );
        this.app.use( this.endpoints.users, require( '../routes/users' ) );

    }

    listen()
    
    {

        this.app.listen( this.port, () => console.log( 'Server running on http://localhost:' + this.port ) );

    }

}

module.exports = Server;