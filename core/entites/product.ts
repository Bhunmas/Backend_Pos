export class Product {
    constructor(public id: string, public name: string) {}
    toJSON(){
      return {id:this.id,name:this.name};
    }
  }