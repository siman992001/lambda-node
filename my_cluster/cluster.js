const numCPUs = require('node:os').cpus().length
const cluster = require('node:cluster')
const process = require('node:process')
const http = require('node:http')

exports.my_cluster = async function (event, context) {
  console.log(`num of cpus is ${numCPUs}`)
  console.log(`primary cluster ${cluster.isPrimary}`)

  if (cluster.isPrimary) {
    console.log(`process id is ${process.pid}`)

    for (i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`${worker.process.pid} has died`);
    })
  } else {
    http.createServer((req, res)=>{
        res.writeHead(200);
        res.write(`PID ${process.pid}\n`);
        return res.end()
    }).listen(8000);
    console.log(`${process.pid} started`);
  }
}

exports.my_cluster()
