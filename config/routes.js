/**
 * Created by rahul on 11/7/16.
 */

module.exports = function(app) {

    app.get('/api/ping', function(req, res){
        res.send({message: 'Ping succeded'});
    });

    var users = require('../api/controllers/admin/users');
    app.get('/api/users', users.get);
    app.post('/api/users', users.create);

};
