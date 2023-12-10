import { Page } from "puppeteer";
import Agent from "../Puppeteer";

export default abstract class BaseModule {
  constructor(protected agent: Agent) { }

  public abstract start(): Promise<void>;
  public abstract waitForSelector(name: string): Promise<void>;
  public abstract waitForNavigation(name: object): Promise<void>;
  public abstract goto(page: Page, url: string, object: object): Promise<void>;

}
