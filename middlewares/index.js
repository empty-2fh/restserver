const validate_data = require( '../middlewares/validate-data' );
const validate_JWT  = require('../middlewares/validate-jwt');
const validate_role = require('../middlewares/validate-role');

module.exports = 

{

    ...validate_data,
    ...validate_JWT,
    ...validate_role

}