var AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
AWS.config.update({ region: 'us-east-1' })

var docClient = new AWS.DynamoDB.DocumentClient()

var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

exports.handler = function (event, context) {
  console.log('****event', event)
  if (event && event.action == 'CREATE') {
    const create_params = {
      AttributeDefinitions: [
        {
          AttributeName: 'year',
          AttributeType: 'N'
        },
        {
          AttributeName: 'title',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'year',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'title',
          KeyType: 'RANGE'
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 40,
        WriteCapacityUnits: 40
      },
      TableName: 'movies'
    }
    console.log('creating table movies')
    //Create table in DynamoDB
    ddb.createTable(create_params, function (err, data) {
      console.log('creating table movies callback function')
      if (err) console.log(err, err.stack)
      // an error occurred
      else console.log(data)
    })
  } else {
    console.log('writing to table movies')
    readS3().on('finish', () => {
      console.log(`Finished downloading json file`)
      var start = Date.now()
      console.log(`Started reading json file`)
      var all_movies = JSON.parse(
        fs.readFileSync('/tmp/moviedata.json', 'utf8')
      )
      var end = Date.now()
      console.log(
        `Finished reading json file took ${(end - start) / 1000} secs`
      )

      console.log(`size is ${all_movies.length}`)
      var count = 0
      all_movies.forEach(function (movie) {
        count++
        var params = {
          TableName: 'movies',
          Item: {
            year: movie.year,
            title: movie.title,
            info: movie.info
          }
        }
        //console.log(params)
        if (count < 25) {
          //console.log(`count is ${count}`)
          docClient.put(params, function (err, data) {
            if (err) {
              console.error(
                'Unable to add movie',
                params,
                '. Error JSON:',
                JSON.stringify(err, null, 2)
              )
            } else {
              console.log('PutItem succeeded:', params.Item.title)
            }
          })
        }
      })
    })
  }
}

function readS3 () {
  const s3_key = 'data/moviedata.zip'
  const s3_bucket = 'ramon-lewis-798787'
  console.log(`Reading object: ${s3_key} from s3 bucket: ${s3_bucket}`)
  var s3 = new AWS.S3({})

  var options = {
    Bucket: s3_bucket,
    Key: s3_key
  }

  const json_file = 'moviedata.json'
  const json_folder = '/tmp'
  const rs = s3.getObject(options).createReadStream()
  const ws = fs.createWriteStream(path.join(json_folder, json_file))
  const unzip = zlib.createGunzip()
  return rs.pipe(unzip).pipe(ws)
}

//exports.handler({ action: 'CREATE' })
//exports.handler()
