'use strict'

const dns = require('dns')
dns.lookup('test.com', (_, addr, family) => {
  console.log(`address: ${addr}, ${family}`)
}) // IPv4

dns.resolve4('archive.org', (err, addrs) => {
  if (err) throw err
  console.log(JSON.stringify(addrs))
  addrs.forEach(a => {
    dns.reverse(a, (err, hostnames) => {
      if (err) throw err
      console.log(`reserve for ${a}: ${JSON.stringify(hostnames)}`)
    })
  })
})
