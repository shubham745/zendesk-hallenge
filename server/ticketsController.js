const https = require('https')
const config = require("../config/local.js").default;

ticketsController = {
  get: (req, res) => {
    let resultCombination = []
    
    helper('/api/v2/tickets', res, resultCombination)
  }
}

function helper(api, response, resultCombination) {
  const auth = 'Basic ' + Buffer.from(config.auth.username + ':' + config.auth.password).toString('base64');
  const options = {
    hostname: config.host,
    path: api,
    port:config.port,
    method: 'GET',
    headers: {
    "Authorization": auth,
    "Content-Type":"application/json"
    }
  };

  let req = https.request(options, res => {
    // console.log(`statusCode: ${res.statusCode}`)
    let str = ""

    res.on('data', d => {
      // console.log('hre1')
      d = d.toString()
      str += d
      // console.log(str)
    })
  
    res.on('end', function () {
      // console.log('here3')
      try {
      let jsonValue = JSON.parse(str)
      resultCombination.push(jsonValue)

      let nextPageValue = jsonValue["next_page"]
      if (nextPageValue && nextPageValue.length > 0 && nextPageValue.split('zendesk.com').length > 1){

        // getting all data as api returns 100 calues per call
        helper(nextPageValue.split('zendesk.com')[1], response,resultCombination)
      } else {
        let obj = {tickets: []}

        resultCombination.forEach(result => {
          if (result["error"]) {
            throw new Error(result["error"])
          }
          
          obj.tickets =  obj.tickets.concat(result["tickets"])
        })
        
        response.json(obj)
      }
      
      } catch(err) {
        //console.error(err)
        // Error handling. Incase the returned response is not a JSON
        return response.status(500).send(err.message)
      }
    })
  })

  req.on('error', error => {
    // console.log('hre')
    response.status(500).send(error)

  })
  req.end()
}
  


module.exports = {default: ticketsController};