`baseURL: https://afxltd.fn.thelarkcloud.com/`

# GOD

`GET baseURL/createRoom?number=<Number>`
创建房间，

# Player

`GET baseURL/joinRoom?roomid=<String>?`

rooms:[{
    "roomid": String,
    "players": [{
        "name": String,
        "role": String,
        "status": Boolean,
        "identities": [String]
    }],    
}]
players:[{
    "name": String,
    "win": Number,
}]