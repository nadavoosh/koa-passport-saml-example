# koa-passport-saml-example


This is a simple example of using [passport-saml](https://github.com/bergie/passport-saml) with [koa-passport](https://github.com/rkusa/koa-passport). 

I made this because this use case is not covered in [koa-passport-example](https://github.com/rkusa/koa-passport-example).

To get this working, you'll need to update the `entryPoint`, `issuer`, and `pathToPublicCert` vars in the [`passport.js`](https://github.com/nadavoosh/koa-passport-saml-example/blob/master/passport.js#L21-L23) file.

Then just: 

```
npm install
npm start
```

navigating to `localhost:8080` should redirect you for SAML authentication. Once you're authed, you'll be able to hit `localhost:8080` and see the success message. 
 

