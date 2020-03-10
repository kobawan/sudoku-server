class LoggerService {
  public info(...msgs: any[]) {
    console.log(...msgs);
  }
  public error(...msgs: any[]) {
    console.error(...msgs);
  }
}

export const Logger = new LoggerService();
