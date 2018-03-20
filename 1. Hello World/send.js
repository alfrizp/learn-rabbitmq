const amqp = require('amqplib')

amqp.connect('amqp://localhost')
  .then(conn => {
    return conn.createChannel().then(ch => {
      const q = 'hello'
      const msg = 'Hello world!'

      const ok = ch.assertQueue(q, { durable: false })
      return ok.then(() => {
        ch.sendToQueue(q, Buffer.from(msg))
        console.log('- Sent', msg)
        return ch.close()
      })
    }).finally(() => conn.close())
  }).catch(console.warn)