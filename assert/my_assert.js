const assert = require('assert')

exports.handler = function (event, context) {
  let x = 4
  let y = 5
  try {
    assert(x == y)
  } catch (err) {
    console.log(err instanceof assert.AssertionError)
    console.log('error', err.message)
  }

  console.log('2 === "2"', 2 === '2')
  console.log('2 == "2"', 2 == '2')
}
