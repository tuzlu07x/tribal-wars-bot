import Auth from "../Clans/Auth";
import Agent from "../Puppeteer/Agent";
import Window from "../Puppeteer/Window";
import { TWCredentials, } from "../types";

export default class TWClient {
  protected loginWindow: Window | null = null;
  constructor(
    protected agent: Agent,
    protected credentials: TWCredentials
  ) {

  }

  public async start(): Promise<void> {
    try {
      await this.agent.start();
      await this.loginIfNotLoggedIn();
    } catch (error) {
      console.error(error);
    }
  }


  protected async loginIfNotLoggedIn(): Promise<void> {

    if (!this.loginWindow) this.loginWindow = this.agent.newWindow();
    const auth = new Auth(this.agent, this.credentials)
    auth.login()
  }
}
