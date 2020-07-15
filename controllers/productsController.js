const {Category, Product} = require('../database/models')

const productsController = {
    categories : function(req, res){

        const product = Product.findAll();
        const categories = Category.findAll();

        Promise.all([product,categories])
              .then(([product,categories])=>{
                  return res.render('products',{product,categories})
              })   
    },
    
    create: function (req, res) {

        Category.findAll()
        .then(categories =>{
            return res.render('crear',{categories}); 
        })
    },

    store:function(req,res){
        
        let product=req.body;   
        product.img= req.file.filename;
        product.idUser=req.session.user.id; 
        product.idCategory=Number(req.body.category);

        Product.create(product)

        .then(product => {
            return res.redirect('/products/detail/'+ product.id );
        })
    },

    detail:function(req,res){

        Product.findByPk(req.params.productId)
               .then(product => res.render('detalleProducto',{product}));


    },
    edit:function(req,res){

        const product = Product.findByPk(req.params.productId);
        const categories = Category.findAll();

        Promise.all([product,categories])
              .then(([product,categories])=>{
                  return res.render('editarProducto',{product,categories})
              })

         
    },

    update:function(req,res){

        Product.findByPk(req.params.productId)
            .then(productoEncontrado => {
                let product = req.body;
                product.idUser=req.session.user.id;
                product.img= req.file ? req.file.filename : productoEncontrado.img;
        
                Product.update(product,{
                    where:{
                        id:req.params.productId
                    }
                })
        
                .then(confirm =>{
        
                    return res.redirect('/products/detail/' + req.params.productId);
        
                })
                .catch(error => console.log(error));
            })

        

    },

    destroy:function(req,res){
        Product.destroy({
            where:{
                id:req.params.id
            }

        })
          .then(() => res.redirect('/products')); 
    },

    mostrarPorCategoria:function(req,res){

        const products = Product.findAll({
            where:{
                idCategory: req.params.id
            }
        });
        const categories = Category.findAll();

        Promise.all([products,categories])
              .then(([products,categories])=>{
                  return res.render('products',{products,categories})
              })

        

    }
};


module.exports = productsController;