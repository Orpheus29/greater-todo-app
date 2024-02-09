import { compare, hash } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { User } from '../entities/user.entity';
import { BadRequest } from '../errors/bad-request.error';
import { ERRORS } from '../errors/messages/messages.const';

export class UserService {
  async register(email: string, password: string) {
    const exists = await User.exists({ where: { email } });
    if (exists) throw new BadRequest(ERRORS.USER_EXISTS);
    const hashedPass = await hash(password, 10);
    const user = await User.create({ email, password: hashedPass }).save();
    return user;
  }

  async login(email: string, password: string) {
    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) throw new BadRequest(ERRORS.USER_NOT_FOUND);
    const isValidPass = await compare(password, foundUser.password);
    if (!isValidPass) throw new BadRequest(ERRORS.WRONG_PASSWORD);
    return foundUser;
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const foundUser = await User.findOne({ where: { id: userId } });
    if (!foundUser) throw new BadRequest(ERRORS.USER_NOT_FOUND);
    const isCorrectPass = await compare(oldPassword, foundUser.password);
    if (!isCorrectPass) throw new BadRequest(ERRORS.WRONG_PASSWORD);
    const hashedPass = await hash(newPassword, 10);
    foundUser.password = hashedPass;
    await foundUser.save();
  }

  async resetPassword(resetId: string, newPassword: string) {
    try {
      const foundUser = await User.findOne({ where: { resetId } });
      if (!foundUser) throw new BadRequest(ERRORS.USER_NOT_FOUND);
      const hashedPass = await hash(newPassword, 10);
      foundUser.password = hashedPass;
      foundUser.resetId = randomUUID();
      await foundUser.save();
    } catch (error) {
      throw new BadRequest(ERRORS.RESET_ERROR);
    }
  }

  async getUserByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new BadRequest(ERRORS.USER_NOT_FOUND);
    return user;
  }
}
