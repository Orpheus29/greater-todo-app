import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { env } from 'process';
import { User } from '../entities/user.entity';
import { AuthError } from '../errors/auth-error.error';
import { ERRORS } from '../errors/messages/messages.const';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_SECRET
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload: Express.User, done) => {
  const user = await User.findOne({ where: { id: jwtPayload?.id } });
  if (!user) done(new AuthError(ERRORS.UNATHORIZED));
  done(null, jwtPayload);
});

passport.use('jwt', jwtStrategy);

export const authRequired = passport.authenticate(jwtStrategy, { session: false });
