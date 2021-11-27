const https = require('https')
const config = require("../config/local.js").default;

ticketsController = {
  get: (req, res) => {
    let ans = []
    
    helper('/api/v2/tickets', res,ans)
  }
}

function helper(api, response, ans) {
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
      ans.push(jsonValue)

      let nextPageValue = jsonValue["next_page"]
      if (nextPageValue && nextPageValue.length > 0 && nextPageValue.split('zendesk.com').length > 1){

        // getting all data as api returns 100 calues per call
        
        helper(nextPageValue.split('zendesk.com')[1], response,ans)
      } else {
        let obj = {tickets: []}

        ans.forEach(elem => {
          obj.tickets =  obj.tickets.concat(elem["tickets"])
        })
        
        response.json(obj)
      }
      
      } catch(err) {
        return response.status(500).send('Api Response is not of type JSON')
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