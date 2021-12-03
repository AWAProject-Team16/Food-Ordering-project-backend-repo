const express = require('express');
const router = express.Router();
const categories = require('../models/categories');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(cors())
router.use(passport.initialize());


// Gets categories by restaurantId. Works
router.get('/restaurant/:restaurant_id', 
function(req, res) {
  categories.getRestaurantCategories(req.params.restaurant_id,
    function(err, dbResult) {
    if(err) {
      res.status(500).json(err);
    }
    else {
      if(dbResult == '') {
        res.status(404).json({"Status": 404 + ", Categories in restaurant not found"});
      }
      else {
        res.status(200).json({Categories: dbResult});
      }
    }
  });
});


// Adds a category to the selected restaurant by restaurantId. If the account does not have permission to do so, the category is not added to the restaurant. Works
router.post('/restaurant/:restaurant_id/addCategory', passport.authenticate('jwt', { session: false }),
function(req, res) {
  categories.checkPermissions(req.user.idusers, req.params.restaurant_id,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {

        try {
        if(dbResult[0]['account_type'] == 2) {
          if(dbResult[0]['idrestaurants'] == req.params.restaurant_id) {

            categories.addCategory(req.params.restaurant_id, req.body, 
              function(err, dbResult) {
                if(err) {
                  res.status(500).json(err);
                }
                else {
                  if(dbResult.affectedRows == 0) {
                    res.status(400).json({"Status": 400 + ", Something is wrong with adding a category to the restaurant. Try again or contact the IT manager"});
                  }
                  else {
                    res.status(201).json({"Status": 201 + ', Category added'});
                  }
              }
            });
        }
      }
    }catch{
      res.status(400).json({"Status": 400 + ", You have no permission to add categories to this restaurant. For help, contact the IT manager"});
    }
    }
  });
});

// Added by Thuc
// Adds a category to the selected restaurant by restaurantId. If the account does not have permission to do so, the category is not added to the restaurant. Works
router.post(
  "/restaurant/:restaurant_id/addCategory2",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    categories.checkPermissions(
      req.user.idusers,
      req.params.restaurant_id,
      function (err, dbResult) {
        if (err) {
          res.status(500).json(err);
        } else {
          try {
            if (dbResult[0]["account_type"] == 2) {
              if (dbResult[0]["idrestaurants"] == req.params.restaurant_id) {
                console.log('req.body', req.body)
                categories.addCategory(
                  req.params.restaurant_id,
                  req.body,
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
                              ", Something is wrong with adding a category to the restaurant. Try again or contact the IT manager",
                          });
                      } else {
                        res
                          .status(201)
                          .json({ Status: 201 + ", Category added" });
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
                  ", You have no permission to add categories to this restaurant. For help, contact the IT manager",
              });
          }
        }
      }
    );
  }
);

// Rename a category from the selected restaurant. If the account does not have permission to do so, the category cannot be renamed. Works
router.post('/restaurant/:restaurant_id/category/:category_id/renameCategory', passport.authenticate('jwt', { session: false }),
function(req, res) {
  categories.renameCategory(req.user.idusers, req.params.restaurant_id, req.params.category_id, req.body,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult.affectedRows == 0) {
          res.status(400).json({"Status": 400 + ", Something wrong with category renaming. Try again or contact the IT-manager"});
        }
        else {
          res.status(200).json({"Status": 200 + ", Category renamed. New category name: "+req.body.name});
        }
      }
    });
});

// Removes the category from the selected restaurant with categoryId. If not your own restaurant, category deletion is not possible. Works
router.delete('/restaurant/:restaurant_id/category/:category_id/deleteCategory', passport.authenticate('jwt', { session: false }),
function(req, res) {
  categories.deleteCategory(req.user.idusers, req.params.restaurant_id, req.params.category_id,
    function(err, dbResult) {
      if(err) {
        res.status(500).json(err);
      }
      else {
        if(dbResult.affectedRows == 0) {
          res.status(400).json({"Status": 400 + ", Something wrong with removing category from restaurant. Try again or contact the IT-manager"})
        }
        else {
          res.status(200).json({"Status": 200 + ', Category removed'});
        }
      }
    });
});
module.exports = router;