
// Middleware para chequear que el usuario que esta accediendo tenga el permiso adecuado
const checkPermission = (permission) => {
    return ( req, res , next ) => {

        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Peligro: Se esta intentando acceder sin autorización'
            });
        }
        
        if(req.user.permission.include(permission)){
            return res.status(500).json({
                msg: `No tiene permisos para: ${permission}`
            });
        }
    
        next();
    }
}


module.exports = {
    checkPermission
}