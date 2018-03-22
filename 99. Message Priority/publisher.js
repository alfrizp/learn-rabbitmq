const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    const q = 'msg_prior'
    const msg = process.argv[2] || 'Hello World!'
    const prior = parseInt(process.argv[3], 10)

    ch.assertQueue(q, { durable: true, maxPriority: 10 })
    ch.sendToQueue(q, new Buffer(msg), { persistent: true, priority: prior })
    console.log(`[x] Sent '%s'`, msg)
  })
  setTimeout(() => {
    conn.close()
    process.exit(0)
  }, 500)
})