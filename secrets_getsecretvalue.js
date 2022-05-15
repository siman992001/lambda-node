var AWS = require('aws-sdk'),
  region = 'us-east-1',
  secret_name = 'python_user',
  secret

var client = new AWS.SecretsManager({ region: region })

exports.handler = (event, context, callback) => {
      
    client.getSecretValue({ SecretId: secret_name }, function (err, data) {
      if (err) {
        if (err.code === 'ResourceNotFoundException') {
          console.log('***************', err.code, '***************')
        }
        throw err
      } else {
        console.log('****************', data, '****************')
        secret = data.SecretString
        console.log('secret is', secret)
      }
    })
};