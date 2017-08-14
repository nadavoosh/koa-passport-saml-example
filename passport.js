'use strict';

const Strategy = require('passport-saml').Strategy;
const passport = require('koa-passport');
const fs = require('fs');

// Update the variables below with correct values:
const entryPoint = 'my-entryPoint-url';
const issuer = 'my_issuer_name';
const pathToPublicCert = '/path/to/my.cert';

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
  entryPoint,
  issuer,
  cert: fs.readFileSync(pathToPublicCert).toString(),
};

passport.use(new Strategy(samlConf, onProfile));

module.exports = passport;
