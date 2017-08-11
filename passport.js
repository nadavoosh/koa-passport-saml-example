'use strict';

const Strategy = require('passport-saml').Strategy;
const passport = require('koa-passport');
const fs = require('fs');

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  cb(null, user);
});

function onProfile(profile, cb) {
  return cb(null, { email: profile.nameID });
}

const samlConf = {
  path: '/auth/saml/callback',
  entryPoint: 'https://my-saml-provider.com/rest-of-entryPoint-url',
  issuer: 'my_issuer_name',
  cert: fs.readFileSync('/path/to/my.cert').toString(),
};

passport.use(new Strategy(samlConf, onProfile));

module.exports = passport;
