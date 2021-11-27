var config = {
  host: "", //'zccmadison.zendesk.com',
  port:443,
  auth : {
    username: "",//'shubham745@gmail.com',
    password: "", //'password'
  },
  api: {
    'getTickets': '/api/v2/tickets'
  }

}

module.exports =  {default: config};