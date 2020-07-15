function logueadoMW(req,res,next){
   
    if(req.session.user!= undefined){
        next();
    }else{
        res.send('Esta página es solo para Usuarios logueados');
    }

}

module.exports=logueadoMW;