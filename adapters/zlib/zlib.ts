import { buffer } from "node:stream/consumers";

const zlib = require('zlib');

export class createZlibService{
    // compressed
    deflateSync(value){
        return new Promise((resolve,reject)=>{
            // from ut8 to base 64 
            // zlib zipdata , small data
            const result = zlib.deflateSync(Buffer.from(value, 'utf8'))
            // transform to base64 because was zip data loss any charater and then human can't read, alien language. 
            resolve(result.toString('base64'));
        })
        
       
    }
    // decompressed
    inflateSync(value){
        return new Promise((resolve,reject)=>{

            // get base64 data and unzip data and return realistic data of them
            const result =zlib.inflateSync(Buffer.from(value, 'base64'))
            // utf-8 for human friendly 

            resolve(result.toString('utf-8'));
        })
    }
}