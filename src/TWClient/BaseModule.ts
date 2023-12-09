import TWClient from ".";

export default abstract class BaseModule {
  constructor(protected client: TWClient) { }

  public abstract getRelatedFunc(): Promise<void>;

}
