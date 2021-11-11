const db = require('../lib/database.js');

const categories = {

    // Get all categories in restaurant from database
    getAllCategories: (restaurantId, callback) => {
            if(callback) {
                db.query('select category_name from categories where restaurants_idrestaurants=?', [restaurantId], callback);
            } 
            else {
                console.error('ERROR: categories cannot found');
                return;
            }
    },
    
    // Get category from database by restaurant and category Id
    getCategoryById: (restaurantId, categoryId, callback) => {
        if(callback) {
            db.query('select * from categories where restaurants_idrestaurants=? AND idcategories=?', [restaurants_idrestaurants, categoryId], callback);
        } 
        else {
            console.error('ERROR: category by id not found');
            return;
        }
    },

    // Creating category in category-table for restaurant
    createCategory: (restaurantId, categoryName, callback) => {
        if(callback) {
            db.query('insert into categories (restaurants_idrestaurants, category_name) value (?, ?)', [restaurantId, categoryName], callback);
        }
        else {
            console.error('ERROR: category cant create');
            return;
        }
    },
    
    // Deleting category from database
    deleteCategory: (restaurantId, categoryId, categoryName, callback) => {
        if(callback) {
            // !!!
        }
        else {
            console.error('ERROR');
            return;
        }
    }
}

module.exports = categories;