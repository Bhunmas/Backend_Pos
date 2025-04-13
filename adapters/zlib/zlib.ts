
const zlib = require('zlib');

export class createZlibService{
    // compressed
    deflateSync(value){
        zlib.deflateSync(Buffer.from(value, 'utf8'))
    }
    // decompressed
    inflateSync(value){
        return new Promise((resolve,reject)=>{
            const result =zlib.inflateSync(Buffer.from(value, 'base64'))
            resolve(result.tostring());
        })
    }
}