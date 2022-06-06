const crypto = require('crypto')
//const argv = require('yargs').argv

exports.crypto = async function (event, context) {
  const encode = event.encode;
  const decode = event.decode;
  const my_key = event.key;
  const data = event.data;
  const resizedIV = Buffer.allocUnsafe(16)
  const iv = crypto
    .createHash('sha256')
    .update('myHashedIV')
    .digest()

  iv.copy(resizedIV)

  if (encode && my_key) {
    const key = crypto
      .createHash('sha256')
      .update(my_key)
      .digest()
    const cipher = crypto.createCipheriv('aes256', key, resizedIV)
    const msg = []

    msg.push(cipher.update(data, 'binary', 'hex'))
    msg.push(cipher.final('hex'))
    console.log(msg.join(''))
  } else if (decode && my_key) {
    const key = crypto
      .createHash('sha256')
      .update(my_key)
      .digest()
    const decipher = crypto.createDecipheriv('aes256', key, resizedIV)
    const msg = []

    msg.push(decipher.update(data, 'hex', 'binary'))
    msg.push(decipher.final('binary'))
    console.log(msg.join(''))
  }
}

//const event = {'encode':'encode', 'key':'ramon', 'data':'secret password is a secret'}
//const event = {'decode':'decode', 'key':'ramon','data':'bf5d195767e87235b01338f36408632265434e6ac8cd502f87355faf05b7d7a8'}
//exports.crypto(event)

//node my_crypto/secretmsg.js -e --key="ramon" "secret password is a secret"
//node my_crypto/secretmsg.js -d --key="ramon" bf5d195767e87235b01338f36408632265434e6ac8cd502f87355faf05b7d7a8
