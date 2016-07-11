/**
 * Created by rahul on 12/7/16.
 */

var mongoose    = require('mongoose'),
    UserService = require('../../services/UserService.js');

module.exports = {

    get: function(req, res) {
        UserService.get(function(err, data) {
            if(err) {
                console.log('Error while fetching users' , err);
                return res.send(404, {err: err});
            }
            return res.send(data);
        });
    },

    create: function(req, res) {
        var params = req.body;
        UserService.create(params, function(err, data) {
            if(err) {
                console.log('Error while creating user', err);
                return res.send(400, {err: err});
            }
            return res.send(data);
        });
    }
};
