import { APP_KEYS } from '../common/consts';
import { STORAGE_KEYS } from '../common/consts/app-keys.const';
import { IUser, Token } from '../common/types/auth.types';
import HttpService from './http.service';

class AuthService extends HttpService {
  constructor(private backendKey: string = APP_KEYS.BACKEND_KEYS.AUTH) {
    super();
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.requestReset = this.requestReset.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  async register(email: string, password: string) {
    const { data } = await this.post(
      {
        url: `${this.backendKey}/${APP_KEYS.BACKEND_KEYS.REGISTER}`,
        data: { email, password }
      },
      false
    );
    return data;
  }

  async login(email: string, password: string) {
    const { data } = await this.post<Token>(
      {
        url: `${this.backendKey}/${APP_KEYS.BACKEND_KEYS.LOGIN}`,
        data: { email, password }
      },
      false
    );
    localStorage.setItem(STORAGE_KEYS.JWT_TOKEN, data.token);
    return data;
  }

  async logout() {
    localStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
  }

  async requestReset(email: string) {
    const { data } = await this.post(
      {
        url: `${this.backendKey}/${APP_KEYS.BACKEND_KEYS.REQUEST_RESET}`,
        data: { email }
      },
      false
    );
    return data;
  }

  async resetPassword(id: string, newPassword: string) {
    const { data } = await this.post<void>(
      {
        url: `${this.backendKey}/${APP_KEYS.BACKEND_KEYS.RESET_PASSWORD(id)}`,
        data: { newPassword }
      },
      false
    );
    return data;
  }

  async changePassword(id: string, oldPassword: string, newPassword: string) {
    const { data } = await this.post<void>(
      {
        url: `${this.backendKey}/${APP_KEYS.BACKEND_KEYS.CHANGE_PASSWORD(id)}`,
        data: { oldPassword, newPassword }
      },
      false
    );
    return data;
  }

  async getUser() {
    const { data } = await this.get<IUser>(
      {
        url: `${this.backendKey}/${APP_KEYS.BACKEND_KEYS.GET_USER}`
      },
      true
    );
    return data;
  }
}

export const authService = new AuthService();
