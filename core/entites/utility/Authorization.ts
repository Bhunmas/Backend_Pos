export class Authorization{
    token: string;
    currentTime: string;
    expierTime: string;
  constructor(token: string, currentTime: string,expierTime:string) {
    this.token = token;
    this.currentTime = currentTime;
    this.expierTime = expierTime;
  }
}