import { APIRequestContext } from "@playwright/test";

export class AuthenticationAPI {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async login(email: string, password: string) {
    return await this.request.post(`${process.env.API_URL}/users/login`, {
      data: {
        email,
        password,
      },
    });
  }
}
