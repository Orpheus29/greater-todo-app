import { Response, Request } from 'express';
import { sign } from 'jsonwebtoken';
import { env } from 'process';
import { UserService } from '../services/user.service';
import { HttpStatus } from '../types/http-status.type';
import { mailService } from '../services/mail.service';

export class UserController {
  constructor(private userService: UserService) {}

  async getUser(req: Request, res: Response) {
    const user = req.user as Express.User;
    return res.send(user);
  }

  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    await this.userService.register(email, password);
    return res.status(HttpStatus.CREATED).send();
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.userService.login(email, password);
    const token = sign({ email, id: user.id }, env.JWT_SECRET, { expiresIn: '1h' });
    return res.send({ token });
  }

  async requestChangePass(req: Request, res: Response) {
    const { email } = req.body;
    const { resetId } = await this.userService.getUserByEmail(email);
    mailService.sendResetPasswordMail(email, `${env.FRONT_END}/reset/${resetId}`);
    return res.send();
  }

  async changePassword(req: Request, res: Response) {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;
    await this.userService.changePassword(id, oldPassword, newPassword);
    return res.send();
  }

  async resetPassword(req: Request, res: Response) {
    const { newPassword } = req.body;
    const { id } = req.params;
    await this.userService.resetPassword(id, newPassword);
    return res.send();
  }
}

const userController = new UserController(new UserService());
export default userController;
