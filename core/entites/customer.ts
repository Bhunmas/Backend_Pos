export class Customer {
    constructor(public name: string, public quantity: number) {}
    toJSON(){
      return {name:this.name,quantity:this.quantity};
    }
  }