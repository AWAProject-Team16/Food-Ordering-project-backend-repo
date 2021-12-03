const express = require('express');
const router = express.Router();
const products = require('../models/products');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(cors())
router.use(passport.initialize());

const upload = require('../lib/handleImages');

// Gets all restaurant products. Works
router.get('/restaurant/:idrestaurants',
function(req, res) {
  products.getAllProducts(req.params.idrestaurants,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult == '') {
          res.status(400).json({"Status": 400 + ", No available products"});
        }
        else {
          res.status(200).json({Products: dbResult});
        }
      }
    }
  )
})

// Gets product by productId. Works
router.get('/product/:product_id', 
function(req, res) {
  products.getProductById(req.params.product_id,
  function(err, dbResult){
    if(err) {
      res.status(500).json(err);
    }
    else {
      if(dbResult == '') {
        res.status(400).json({"Status": 400 + ", No product with this id: "+req.params.product_id});
      }
      else {
        res.status(200).json(dbResult);
      }
    }
  });
});

// Gets all products by categoryId. Works
router.get('/category/:category_id',
function(req, res) {
  products.getProductByCategory(req.params.category_id,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult == '') {
          res.status(400).json({"Status": 400 + ", No products in category with this id: "+req.params.category_id});
        }
        else {
          res.status(200).json({ Products: dbResult });
        }
      }
    });
});

// Adds a product to the selected category by categoryId. If the account does not have permission to do so, the product will not be added to the category. Works
router.post('/category/:category_id/addProduct', passport.authenticate('jwt', { session: false }),
function(req, res) {
  products.checkPermissions(req.user.idusers, req.params.category_id,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        try {
        if(dbResult[0]['account_type'] == 2) {
          if(dbResult[0]['idcategories'] == req.params.category_id) {

            products.addProduct(req.params.category_id, req.body, 
              function(err, dbResult) {
                if(err) {
                  res.status(500).json(err);
                }
                else {
                  if(dbResult.affectedRows == 0) {
                    res.status(400).json({"Status": 400 + ", Something wrong with adding product in category with this id: "+req.params.category_id+". Try again or contact the IT-manager"});
                  }
                  else {
                    res.status(201).json({"Status": 201 + ', Product added'});
                  }
              }
            });
        }
      }
    }catch{
      res.status(400).json({"Status": 400 + ", No permissions for adding product in this category. For help, contact the IT-manager"});
    }
    }
  });
});

// Adds a product to the selected category by categoryId (with image). Added by Thuc
router.post(
  "/category/:category_id/addProductMultipart",
  passport.authenticate("jwt", { session: false }),
  upload.single('product_image'),
  function (req, res) {
    products.checkPermissions(
      req.user.idusers,
      req.params.category_id,
      function (err, dbResult) {
        if (err) {
          res.status(500).json(err);
        } else {
          try {
            if (dbResult[0]["account_type"] == 2) {
              if (dbResult[0]["idcategories"] == req.params.category_id) {
                const productInfo = {...req.body};
                productInfo.product_image = req.file.filename;
                
                products.addProductMultipart(
                  req.params.category_id,
                  productInfo,
                  function (err, dbResult) {
                    if (err) {
                      res.status(500).json(err);
                    } else {
                      if (dbResult.affectedRows == 0) {
                        res
                          .status(400)
                          .json({
                            Status:
                              400 +
                              ", Something wrong with adding product in category with this id: " +
                              req.params.category_id +
                              ". Try again or contact the IT-manager",
                          });
                      } else {
                        res
                          .status(201)
                          .json({ Status: 201 + ", Product added" });
                      }
                    }
                  }
                );
              }
            }
          } catch {
            res
              .status(400)
              .json({
                Status:
                  400 +
                  ", No permissions for adding product in this category. For help, contact the IT-manager",
              });
          }
        }
      }
    );
  }
);

// Modifies product information by productId and categoryId. If the account does not have permission to do so, the product cannot be changed. Works
router.post('/category/:category_id/product/:product_id/editProduct', passport.authenticate('jwt', { session: false }),
function(req, res) {
  products.editProduct(req.user.idusers, req.params.category_id, req.params.product_id, req.body,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult.affectedRows == 0) {
          res.status(400).json({"Status": 400 + ", Something wrong with product modifying. Try again or contact the IT-manager"});
        }
        else {
          res.status(200).json({"Status": 200 + ", Product changed"});
        }
      }
    });
});



// New version of product editing
router.post('/:product_id/editProduct', passport.authenticate('jwt', { session: false }),
function(req, res) {
  products.editProductNoCategory(req.user.idusers, req.params.product_id, req.body,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult.affectedRows == 0) {
          res.status(400).json({"Status": 400 + ", Something wrong with product modifying. Try again or contact the IT-manager"});
        }
        else {
          res.status(200).json({"Status": 200 + ", Product changed"});
        }
      }
    });
});



// Modifies product information by productId (with image). Added by Thuc
router.post(
  '/:product_id/editProductMultipart', 
  passport.authenticate('jwt', { session: false }),
  upload.single('product_image'),
  function(req, res) {
    const productInfo = {...req.body};
    productInfo.product_image = req.file.filename;

    products.editProductNoCategoryMultipart(req.user.idusers, req.params.product_id, productInfo,
      function(err, dbResult) {
        if(err) {
          res.status(500).json(err);
        }
        else {
          if(dbResult.affectedRows == 0) {
            res.status(400).json({"Status": 400 + ", Something wrong with product modifying. Try again or contact the IT-manager"});
          }
          else {
            res.status(200).json({"Status": 200 + ", Product changed"});
          }
        }
      });
  }
);



// Removes the product from the selected category with productId. If not your own created product, product deletion is not possible.
router.delete('/category/:category_id/product/:product_id/deleteProduct', passport.authenticate('jwt', { session: false }),
function(req, res) {
  products.deleteProduct(req.user.idusers, req.params.category_id, req.params.product_id,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult.affectedRows == 0) {
          res.status(400).json({"Status": 400 + ", Something wrong with removing product from category. Try again or contact the IT-manager"})
        }
        else {
          res.status(200).json({"Status": 200 + ', Product removed'});
        }
      }
    });
});

module.exports = router;
