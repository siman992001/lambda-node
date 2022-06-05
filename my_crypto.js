const crypto = require('crypto');

async function my_hash(event, context){
    let hash1 = crypto.createHash('sha256').update('ramon').digest('hex');
    console.log('hash1:', hash1)
    let hash2 = crypto.createHash('sha256').update('ramon').digest('hex');
    console.log('hash2:', hash2)
    
    let hmac1 = crypto.createHmac('sha256', 'secretKey').update('ramon').digest('hex');
    let hmac2 = crypto.createHmac('sha256', 'secretKey').update('ramon').digest('hex');
    console.log('hmac1:', hmac1)
    console.log('hmac2:', hmac2)
}

//my_hash()

