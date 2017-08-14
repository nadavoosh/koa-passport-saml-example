'use strict';

const Koa = require('koa');
const koaPassport = require('./passport');
const Router = require('koa-router');
const session = require('koa-generic-session');
const koaBody = require('koa-body');


const app = new Koa();

// passpport
app.use(koaPassport.initialize());

// sessions
app.keys = ['your-session-secret'];
app.use(session({}));
app.use(koaPassport.session());

// body parser
app.use(koaBody());

// authMiddleware
const authMiddleware = async (ctx, next) => {
  console.log('validating auth');
  if (ctx.isAuthenticated()) {
    return next();
  } else {
    console.log('redirecting for SAML login');
    ctx.redirect('/auth/login');
  }
};

// auth Routes
const authRouter = new Router();
authRouter.get('/auth/login', koaPassport.authenticate('saml'));
authRouter.post('/auth/saml/callback', koaPassport.authenticate('saml'), ctx => ctx.redirect('/'));

// other routes - these require authentication!
const router = new Router();
router.use(authMiddleware);

router.get('/', function(ctx) {
  ctx.body = 'You\'re authenticated!';
});

app.use(authRouter.routes());
app.use(router.routes());

// start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server listening on', port));
