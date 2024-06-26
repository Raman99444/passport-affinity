var passport = require('passport-strategy')
  , util = require('util')
  , lookup = require('./utils').lookup

function Strategy(options, verify) {
  if (typeof options == 'function') {
    verify = options
    options = {}
  }

  if (!verify) { throw new TypeError('LocalStrategy requires a verify callback') }
  
  this._userEmailField = options.userEmail || 'userEmail'
  this._apiKeyField = options.password || 'apiKey'
  this._crmIdField = options.affinityCRMId || 'crmId'
  
  passport.Strategy.call(this)
  this.name = 'affinity'
  this._verify = verify
  this._passReqToCallback = options.passReqToCallback
}

util.inherits(Strategy, passport.Strategy);

Strategy.prototype.authenticate = function(req, options) {
  options = options || {}
  var userEmail = lookup(req.body, this._userEmailField) || lookup(req.query, this._userEmailField)
  var apiKey = lookup(req.body, this._apiKeyField) || lookup(req.query, this._apiKeyField)
  var crmId = lookup(req.body, this._crmIdField) || lookup(req.query, this._crmIdField)
  
  if (!userEmail || !apiKey || !crmId) {
    return this.fail({ message: options.badRequestMessage || 'Missing credentials' }, 400)
  }
  
  var self = this
  
  function verified(err, user, info) {
    if (err) { return self.error(err) }
    if (!user) { return self.fail(info) }
    info = info || {}
    self.success(user, info)
  }
  
  try {
    if (self._passReqToCallback) {
      this._verify(req, userEmail, apiKey, crmId, verified)
    } else {
      this._verify(userEmail, apiKey, crmId, verified)
    }
  } catch (ex) {
    return self.error(ex)
  }
}

module.exports = Strategy
