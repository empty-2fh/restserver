const { request, response } = require( 'express' );
const { Product } = require( '../models' );

const createProducts = async ( req = request, res = response ) =>

{

    const { name, price, description, category, user } = req.body;

    let 

    const data = 
    
        { 
            
            name : name.toUpperCase(), 
            user,
            category,
            price, 
            description, 

        };

    const product = new Product( data );

    await product.save();

    res.status( 201 ).json( { msg : 'Producto creado con exito!' } );

}

const readProducts = async ( req = request, res = response ) =>

{

    const { available, skip, limit } = req.query;

    let query = { status : true};

    if ( available == 'true' || available == 'false' ) 
    
    {
        
        query.available = Boolean( available )

    }

    const [ products, total ] = await Promise.all( 
        
        [

            Product.find( query )
                   .skip( ( Number( skip ) < 0 ) ? 0 : skip )
                   .limit( ( Number( limit ) < 0 ) ? 0 : limit  ),

            Product.countDocuments( query )

        ] );

    res.json( { total, products } );

}

const readProduct = async ( req = request, res = response ) => 

{

    const { id } = req.params;

    const product = await Product.findById( id )
                                 .populate( 'user', 'name' )
                                 .populate( 'category', 'name' )

    res.json( { product } );

}

const updateProduct = async ( req = request, res = response ) =>

{

    const { id } =  req.params;

    const { name, category, price, description , available } = req.body;

    const avl_bool = JSON.parse( available );

    const product = await Product.findById( id );

    let data = {};

    data.name = ( name ) ? name.toUpperCase() : product.name;
    data.user = req.userAuth._id;
    data.category = ( category ) ? category : product.category;
    data.price = ( price && Number( price ) >= 0 ) ? Number( price ) : product.price;
    data.description = ( description ) ? description : product.description; 

    data.available = ( available !== undefined ) ? avl_bool : product.available;

    Product.find

    const product_act = await Product.findByIdAndUpdate( id, data, { new : true } );

    res.json( product_act );
}

const deleteProduct = async ( req = request, res = response ) =>

{

    const { id } = req.params;

    const data = { status : false };

    const product = await Product.findByIdAndUpdate( id, data, { new : true } );

    res.json( { product } );

}

module.exports = 

{

    createProducts,
    readProducts,
    readProduct,
    updateProduct,
    deleteProduct

}