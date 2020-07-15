const bcryptjs=require('bcryptjs');
const { User } = require('../database/models');
const {check,validationResult,body} = require('express-validator');


const usersControllers = {
    register : function(req, res){
        
        return res.render('register');
    },
    processRegister:function(req,res){
        let errors=validationResult(req);

        if(errors.isEmpty()){

        let user=req.body;

        //creamos objeto que se guarda en base de datos
        delete user.retype;
        user.password=bcryptjs.hashSync(user.password,10);
        user.rol= 0;

        User.create(user)
           .then(user => res.redirect('/users/login'));

         }else{
             res.render('register',{errors:errors.errors});
         }

       
    },
    
     login:function(req,res){
         return res.render('login')
    },

    processLogin:function(req,res){

        User.findOne({
            where:{
                email: req.body.email,
            }
        })

        .then(user =>{


            if(user){
                if(bcryptjs.compareSync(req.body.password,user.dataValues.password)){
                    delete user.dataValues.password;
                    req.session.user=user;

                    if (req.body.recordame){
                        res.cookie('email', user.email, {maxAge:1000*60*60  *24}) //200min

                    }

                    return res.redirect('/');
                    
                     }else{
                         return res.redirect('/users/login');
                     }

                      }else{
                        return res.redirect('/users/login');
                      }  
        })
            
    },
    
    check:function(req,res){
        if(req.session.user==undefined){
            res.send("no estas logeado")
        }else{
            res.send("El usuario logueado es " + req.session.user.email);
        }
   },
  
        cart: function (req, res) {

            return res.render('carrito');
        },

        logout:function(req,res){

            req.session.destroy();

            if(req.cookies.email){

                res.clearCookie('email');
            }
            return res.redirect('/');
        }
    

}

module.exports = usersControllers;