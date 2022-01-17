const mongoose = require( 'mongoose' );

const dbConnection = async () => 

{

    try 
    
    {
        
        await mongoose.connect( process.env.MONGODB_CNN, 
            
            {
    
                useNewUrlParser : true,
                useUnifiedTopology : true,
    
            } );
    
        console.log( 'Conectado a la DB ' );

    }

    catch ( err )
    
    {

        console.log( err );

        throw new Error( 'Error al tratar de conectar a la BD' )

    }

}

module.exports = 

{

    dbConnection

}