# passport-affinity

## Install

    $ npm install passport-affinity

## Usage

#### Configure Strategy

The affinity authentication strategy authenticates users using a userEmail and
apiKey.  The strategy requires a `verify` callback, which accepts these
credentials and calls `done` providing a user.

    passport.use(new AffinityStrategy(
      async (userEmail, apiKey, crmId, done) {
        //handle the user requirement here
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'affinity'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.post('/login', 
      passport.authenticate('affinity', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      });


## Tests

    $ npm install

## License

[The MIT License](http://opensource.org/licenses/MIT)
