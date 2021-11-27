const ticketsController = require("./ticketsController").default;
const https = require('https')
const EventEmitter = require('events')

const response = {
  status: () => (response),
  json : jest.fn(),
  send: jest.fn(),
};

describe('test', () => {
  const req = {};
  let emitter = new EventEmitter();
  emitter.end = jest.fn();
  let httpIncomingMessage = {
    on: jest.fn(),
    statusCode: 'mock status code',
    headers: {
      authorization: 'Bearer mocked token'
    },
  };

  https.request = jest.fn().mockImplementation((uri, callback) => {
    if (callback) {
      callback(httpIncomingMessage);
    }
    return emitter;
  });

  it('should get ticketsController correctly', () => {
    ticketsController.get(req,response);
  });

  it('should trigger error event handler correctly', done => {
    ticketsController.get(req, response);
    emitter.emit('error', 'error message');
    process.nextTick(() => {
      expect(response.send).toHaveBeenCalled()
      done();
    });
  });


  

  it('should trigger data handler correctly', done => {
    emitter1 = new EventEmitter();
    httpIncomingMessage = emitter1;
    
    ticketsController.get(req, response);

    emitter1.emit('data', '{');
    emitter1.emit('data', '}');
    emitter1.emit('end');
    // emitter.emit('error', 'error message');
    // emitter.emit('error', 'error message');
    // expect(response.json).toHaveBeenCalled()
    process.nextTick(() => {
      expect(response.json).toHaveBeenCalled()
      done()
    });
  });

  it('non json ouput by tickets api', done => {
    emitter1 = new EventEmitter();
    httpIncomingMessage = emitter1;
    
    ticketsController.get(req, response);
    
    emitter1.emit('data', 'asad');
    emitter1.emit('data', '}');
    emitter1.emit('end');
    // emitter.emit('error', 'error message');
    // emitter.emit('error', 'error message');
    // expect(response.json).toHaveBeenCalled()
    process.nextTick(() => {
      expect(response.send).toHaveBeenCalled()
      done()
    });
  });

  it('json next_page json with next page', done => {
    emitter1 = new EventEmitter();
    httpIncomingMessage = emitter1;
    ticketsController.get(req, response);
    
    emitter1.emit('data', '{\"next_page\":"api.zendesk.com/test1.ap1"');
    emitter1.emit('data', '}');
    emitter1.emit('end');
    emitter1.emit('data', '{');
    emitter1.emit('data', '}');
    process.nextTick(() => {
      expect(response.json).toHaveBeenCalled()
      done()
    });
  });

  it('json next_page json with next page eroor', done => {
    emitter1 = new EventEmitter();
    httpIncomingMessage = emitter1;
    ticketsController.get(req, response);
    
    emitter1.emit('data', '{\"next_page\":"am/test1.ap1"');
    emitter1.emit('data', '}');
    emitter1.emit('end');
    emitter1.emit('data', '{');
    emitter1.emit('data', '}');
    process.nextTick(() => {
      expect(response.json).toHaveBeenCalled()
      done()
    });
  });

});

