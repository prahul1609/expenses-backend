/**
 * Created by rahul on 12/7/16.
 */

var mongoose    = require('mongoose'),
    User        = mongoose.model('User');

module.exports = {
    
    get: function (next) {
        User.find({}, function(err, data) {
            next(err, data);
        });
    },

    create: function (params, next) {
        var user = new User(params);
        user.save(params, function(err, data) {
            next(err, data);
        });
    }
};
