let passport = require('passport');
let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;

/**
 *
 * @param {object} options
 * @param {object} options.logger
 * @param {object} options.jwtConfig
 * @returns {object}
 */
module.exports.getAuthenticationMiddleware = (options)=> {
    let jwtConfig = options.jwtConfig;
    let logger = options.logger;

    this.passportOptions = {
        jwtFromRequest: ExtractJwt.fromHeader(jwtConfig.headerKey),
        secretOrKey: jwtConfig.secret,
        issuer: jwtConfig.issuer,
        audience: jwtConfig.audience
    };
    passport.use(new JwtStrategy(this.passportOptions, (jwt_payload, done)=> {
        let account = {
            userid: 'must be filled', //TODO:This is missing and need to be debuged
            payload: jwt_payload
        };
        logger.debug('Authentication successful:' + JSON.stringify(jwt_payload));
        done(null, account);
    }));
    return passport.authenticate('jwt', {session: false})
};