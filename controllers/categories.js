const { request, response } = require( 'express' );

const { Category } = require( '../models' );

const createCategory = async ( req = request, res = response ) =>

{

    const name = req.body.name.toUpperCase(); 

    const category_exists = await Category.findOne( { name } )

    if ( category_exists )
    
    {

        return res.status( 401 ).json( { msg : 'La categoria ya existe' } );

    }

    const data = 
    
    {

        name,
        user : req.userAuth._id

    }

    const category = new Category( data );

    await category.save();

    res.status( 201 ).json( { msg : 'Categoria creada con exito' } );

}


const readCategories = async ( req = request, res = response ) =>

{

    const { limit = 5, skip = 0 } = req.query;

    const query = { status : true };

    const [ categories, total ] = await Promise.all( 
        
        [

            Category.find( query )
                    .skip( ( Number( skip ) < 0 ) ? 0 : skip )
                    .limit( ( Number( limit ) < 0 ) ? 0 : limit )
                    .populate( 'user', 'name' ),

            Category.countDocuments( query )

        ] );

    res.json( { total, categories } );

}

const readCategory = async ( req = request, res = response ) =>

{

    const { id } = req.params;

    const category = await Category.findById( id )
                                   .populate( 'user', 'name' );

    res.json( { category } );

}

const updateCategory = async ( req = request, res = response ) =>

{

    const { id } = req.params;
    
    const name = req.body.name.toUpperCase();
    const user = req.userAuth._id;

    const data = { name, user };

    const category = await Category.findByIdAndUpdate( id, data, { new : true } );

    res.json( { category } );

}

const deleteCategory = async ( req = request, res = response ) =>

{

    const { id } = req.params;

    const data = { status : false };

    const category = await Category.findByIdAndUpdate( id, data, { new : true } );

    res.json( { category } );

}

module.exports = 

{

    createCategory,
    deleteCategory,
    readCategories,
    readCategory,
    updateCategory

}