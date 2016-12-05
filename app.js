'use strict'

var Koa = require('koa')
var sha1 = require('sha1')
var config = {
    wechat: {
        appID: 'wx5aa48e96c3571a1a',
        appSecret: '3a6e13093a6c0fa18be70ba2a32fe1b0',
        token: 'vhmake'
    }
}

var app = new Koa()

app.use(function *(next) {
    console.log(this.query)

    var token = config.wechat.token
    var signature = this.query.signature
    var timestamp = this.query.timestamp
    var nonce = this.query.nonce
    var echostr = this.query.echostr

    var str = [token, nonce, timestamp].sort().join('')
    var sha = sha1(str)

    if (sha === signature) {
        this.body = echostr + ''
    } else {
        this.body = 'wrong'
    }
})
app.listen(1234)
console.log('Listening is 1234')
