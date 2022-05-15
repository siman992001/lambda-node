const https = require('https')
let url = "https://www.fpl.com"

exports.handler = async function(event){
    const promise = new Promise(function(resolve, reject){
        https.get(url, (res) => {
            res.on('data', (d) => {
                process.stdout.write(d);
            });
            
            resolve(res.statusCode)
        }).on('error', (e) => {
            console.log('error')
            reject(Error(e))
        })
    })
    return promise
}