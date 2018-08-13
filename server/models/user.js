const _ = require('lodash');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator'); 

var UserSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true,
      minLength: 1,
      trim: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
      }
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({
    _id: user._id.toHexString(),
    access
  },'abc123').toString();

  //user.tokens.push({access,token});
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch(e) {
    return Promise.reject('Unauthorized');
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token':token,
    'tokens.access': 'auth'
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};