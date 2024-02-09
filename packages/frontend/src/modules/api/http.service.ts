import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { BACKEND_KEYS, STORAGE_KEYS } from '../common/consts/app-keys.const';

interface Config extends AxiosRequestConfig {
  url: string;
}

class HttpService {
  baseUrl: string;

  fetchingService: typeof axios;

  apiVersion: string;

  constructor(baseUrl = BACKEND_KEYS.SERVER_URL, apiVersion = 'api') {
    this.baseUrl = baseUrl;
    this.fetchingService = axios;
    this.apiVersion = apiVersion;
  }

  private getFullApiUrl(url: string) {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private populateTokenToHeaderConfig() {
    return {
      Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.JWT_TOKEN)}`
    };
  }

  private extractUrlAndDataFromConfig({ data, url, ...configWithoutDataAndUrl }: Config) {
    return configWithoutDataAndUrl;
  }

  async get<T>(config: Config, withAuth = true): Promise<AxiosResponse<T>> {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }

    const res = await this.fetchingService.get<T>(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
    return res;
  }

  async post<T>(config: Config, withAuth = true): Promise<AxiosResponse<T>> {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }

    const res = await this.fetchingService.post<T>(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );

    return res;
  }

  async patch<T>(config: Config, withAuth = true): Promise<AxiosResponse<T>> {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }

    const res = await this.fetchingService.patch<T>(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );

    return res;
  }

  async delete<T>(config: Config, withAuth = true): Promise<AxiosResponse<T>> {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }

    const res = await this.fetchingService.delete<T>(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );

    return res;
  }
}

export default HttpService;
