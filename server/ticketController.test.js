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
  const emitter = new EventEmitter();
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
    emitterResponse = new EventEmitter();
    httpIncomingMessage = emitterResponse;
    
    ticketsController.get(req, response);

    emitterResponse.emit('data', '{');
    emitterResponse.emit('data', '}');
    emitterResponse.emit('end');
    // emitter.emit('error', 'error message');
    // emitter.emit('error', 'error message');
    // expect(response.json).toHaveBeenCalled()
    process.nextTick(() => {
      expect(response.json).toHaveBeenCalled()
      done()
    });
  });

  it('non json ouput by tickets api', done => {
    emitterResponse = new EventEmitter();
    httpIncomingMessage = emitterResponse;
    
    ticketsController.get(req, response);
    
    emitterResponse.emit('data', 'asad');
    emitterResponse.emit('data', '}');
    emitterResponse.emit('end');
    // emitter.emit('error', 'error message');
    // emitter.emit('error', 'error message');
    // expect(response.json).toHaveBeenCalled()
    process.nextTick(() => {
      expect(response.send).toHaveBeenCalled()
      done()
    });
  });

  it('json next_page json with next page', done => {
    emitterResponse = new EventEmitter();
    httpIncomingMessage = emitterResponse;
    ticketsController.get(req, response);
    
    emitterResponse.emit('data', '{\"next_page\":"api.zendesk.com/test1.ap1"');
    emitterResponse.emit('data', '}');
    emitterResponse.emit('end');
    emitterResponse.emit('data', '{');
    emitterResponse.emit('data', '}');
    process.nextTick(() => {
      expect(response.json).toHaveBeenCalled()
      done()
    });
  });

  it('json next_page json with next page eroor', done => {
    emitterResponse = new EventEmitter();
    httpIncomingMessage = emitterResponse;
    ticketsController.get(req, response);
    
    emitterResponse.emit('data', '{\"next_page\":"am/test1.ap1"');
    emitterResponse.emit('data', '}');
    emitterResponse.emit('end');
    emitterResponse.emit('data', '{');
    emitterResponse.emit('data', '}');
    process.nextTick(() => {
      expect(response.json).toHaveBeenCalled()
      done()
    });
  });

});

