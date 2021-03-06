
const assert = require('assert')
const sinon = require('sinon')
const {Person, Network} = require('../src/shouty')

describe('Person', () => {

  let network, message
  beforeEach(() => {
    const range   = 100
    network = new Network(range)
    const message = "Free bagels!"
  })

  it('broadcasts a message to a listener within range', function () {
    const shouterLocation = 0
    const listenerLocation = 90
    const lucy = new Person(network, listenerLocation)
    const lucyStub = sinon.spy(lucy)

    network.subscribe(lucy)
    network.broadcast(message, shouterLocation)

    assert.strictEqual(lucyStub.hear.getCall(0).args[0], message);
  })

  it('does not broadcast a message to a listener out of range', function () {
    const shouterLocation = 0
    const listenerLocation = 150
    const lucy = new Person(network, listenerLocation)
    const lucyStub = sinon.spy(lucy)

    network.subscribe(lucy)
    network.broadcast(message, shouterLocation)

    assert(lucyStub.hear.notCalled)
  })

  it('does not broadcast a message to a listener out of range negative distance', function () {
    const shouterLocation = 0
    const listenerLocation = -150
    const lucy = new Person(network, listenerLocation)
    const lucyStub = sinon.spy(lucy)

    network.subscribe(lucy)
    network.broadcast(message, shouterLocation)

    assert(lucyStub.hear.notCalled)
  })

  it('does not broadcast a message over 180 characters even if listener is in range', function () {
    const shouterLocation = 0;
    const listenerLocation = 90;
    const lucy = new Person(network, listenerLocation);
    const lucyStub = sinon.spy(lucy);

    network.subscribe(lucy);
    network.broadcast(longMessage, shouterLocation);
    if (message.length <= 180) {
      listener.hear(message);
    }
    assert(lucyStub.hear.notCalled);
  })
})
