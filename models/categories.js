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

// add: (book, callback) => {
    //     if ( book && Object.keys(book).length > 0 ) {  
    //         db.query(
    //             'insert into book(title, idmember, author, `year`, edition, `description`, `condition`, image) values(?, ?, ?, ?, ?, ?, ?, ?)',
    //             [book.title, book.idmember, book.author, book.year, book.edition, book.description, book.condition, book.image],
    //             callback
    //         );
    //     } else {
    //         console.error('ERROR: empty POST body!!!');
    //         return;
    //     }
    // },

    // delete: (idmember, idbook, callback) => {
    //     if ( idmember && idbook ) {  
    //         db.query(
    //             'delete from book where idmember=? and idbook=?',
    //             [idmember, idbook],
    //             callback
    //         );
    //     } else {
    //         console.error('ERROR: empty POST body!!!');
    //         return;
    //     }
    // },

    // searchByTitle: (title, callback) => {
    //     if ( title ) {  
    //         const likeString = `%${title}%`;
    //         db.query(
    //             "select * from book where title like ?",
    //             [likeString],
    //             callback
    //         );
    //     } else {
    //         console.error('ERROR: empty POST body!!!');
    //         return;
    //     }
    // },

    
   // },

    // update2: function(idbook, book, callback) {
    //     return db.query(
    //         'update book set title=?, author=?, `year`=?, edition=?, `description`=?, `condition`=? where idbook=?',
    //         [book.title, book.author, book.year, book.edition, book.description, book.condition, idbook],
    //         callback
    //     );
    // }
}

module.exports = categories;