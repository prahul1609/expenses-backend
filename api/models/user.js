/**
 * Created by rahul on 11/7/16.
 */

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

/**
 * Validators
 * @param value
 * @param done
 * @returns {*}
 */

var nameValidator = function(value, done) {
    if(value) {
        return done(/[a-zA-Z]*/.test(value));
    }
};

var usernameValidator = function(value, done) {
    if(value) {
        return done(/[a-z0-9]*/.test(value));
    }
};

var passwordValidator = function(value, done) {
    if(value) {
        return done(/[a-zA-Z0-9]/.test(value));
    }
};

var emailValidator = function(value, done) {
    if(value) {
        return done(/\S+@\S+\.\S+/.test(value));
    }
};

var phoneValidator = function(value, done) {
    if(value) {
        return done(/\d{10}/.test(value));
    }
};

/**
 * Modeling User Schema
 */

var userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        validate: [
            { validator: nameValidator, msg: 'Name should contains only alpha characters'}
        ]
    },
    middleName: {
        type: String,
        trim: true,
        validate: [
            { validator: nameValidator, msg: 'Name should contains only alpha characters'}
        ]
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        validate: [
            { validator: nameValidator, msg: 'Name should contains only alpha characters'}
        ]
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: [
            { validator: usernameValidator, msg: 'username should contains only alphanumeric characters'}
        ]
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: [
            { validator: passwordValidator, msg: 'password should contains only alphanumeric characters'}
        ]
    },
    admin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
        validate:  [
            { validator: emailValidator, msg: 'provide valid email'}
        ]
    },
    phone: {
        type: String,
        required: true,
        validate:  [
            { validator: phoneValidator, msg: 'provide valid phone'}
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

userSchema.methods = {
    /**
     * Modify returns JSON
     * @returns {JSON Object}
     */

    toJSON: function() {
        var obj = this.toObject({
            virtuals: true              //to get id from _id
        });
        delete obj.__v;
        delete obj._id;
        return obj;
    }
};

userSchema.pre('save', function(next) {
    this.updatedAt = new Date;
    next();
});

module.exports = mongoose.model('User', userSchema);
