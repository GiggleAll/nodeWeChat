'use strict'

var Koa = require('koa')
var path = require('path')
var wechat = require('./wechat/g')
var util = require('./libs/util')
var wechat_file = path.join(__dirname, './config/wechat.txt')
var config = {
    wechat: {
        appID: 'wx5aa48e96c3571a1a',
        appSecret: '3a6e13093a6c0fa18be70ba2a32fe1b0',
        token: 'vhmake',
        getAccessToken: function () {
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken: function (data) {
            data = JSON.stringify(data)
            return util.writeFileAsync(wechat_file,data)
        }
    }
}

var app = new Koa()

app.use(wechat(config.wechat))
app.listen(8080)
console.log('Listening is 81080')