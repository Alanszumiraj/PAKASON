const homeController = {
    index : function(req, res){
        let UsuarioLogueado=req.session.user;
        if (UsuarioLogueado==undefined){
        
        return res.render('home');
    }else{
        
        return res.render('home',{UsuarioLogueado:UsuarioLogueado});
    }
    }
}

module.exports = homeController;