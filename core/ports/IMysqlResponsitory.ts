

export interface IMysqlResponsitory{
    connectDb():void;
    readOne(id:number):void;
    readAll():Promise<any>;

}