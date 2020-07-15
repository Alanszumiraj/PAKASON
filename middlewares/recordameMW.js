const { User } = require('../database/models');


function recordameMW(req, res, next){
    
    res.locals.user= false;

    if(req.session.user){
        res.locals.user=req.session.user;
        return next();

    } else if(req.cookies.user){
        User.findOne({
            where:{
                email: req.cookies.user,
            }
        })
        .then(user =>{
            if(user){
            delete user.dataValues.password;

            req.session.user=user;
            res.locals.user=user;
            }
           
            return next();
         
        }) 
    } else {
        return next();
    }

}

module.exports=recordameMW;