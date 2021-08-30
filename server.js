/// - Express Router
const express = require('express');
const app = express();
/// - Http Bağlantısı
const http = require('http').createServer(app);
/// - Expres json & url encode
const bodyy = require('body-parser');
/// - Socket Bağlantısı
const io = require('socket.io')(http);
app.use(bodyy.json());
app.use(bodyy.urlencoded({extended:true}));

/// - Kullanıcılar listesi router - YENİLENDİ
const DiscoveryRouter = require('./Routers/DisocveryRouter')
app.use('/api/users',DiscoveryRouter)
/// - Kullanıcı işlemleri router - YENİLENDİ
const authenticationRouter = require('./Routers/AuthenticationRouter')
app.use('/api/OAuth',authenticationRouter)
/// - Kullanıcı profil işlemleri - YENİ
const userProfileRouter = require('./Routers/UserProfileRouter')
app.use('/api/users/profile',userProfileRouter);
/// - Kullanıcı takip etme işlemi router - YENi
const AddFollowsRouter = require('./Routers/FollowsAndUnfollowsRouter');
app.use('/api/follows',AddFollowsRouter)
/// - Mesaj gönderme router;
const SendMessageRouter = require('./Routers/SendMessageRouter');
app.use('/api/messages',SendMessageRouter)
/// - Tüm hediyeleri çekme Router
const GiftsRouter = require('./Routers/GiftsRouters');
app.use('/api/messages',GiftsRouter);

/// - Mesajlar Socket Bağlantısı Modülü
const MessagesController = require('./Controllers/MessagesController/MessagesController')
/// - AMessajlar ME NameSpace
const MessagesSocketNamSpace = io.of('/Messages')
MessagesSocketNamSpace.on('connection',MessagesController.messages)

/// - Mesajlar Socket Bağlantısı Modülü
const MessagesControllerFromMe = require('./Controllers/MessagesController/MeFromMessagesController')
/// - AMessajlar ME NameSpace
const MessagesSocketFromNamSpace = io.of('/MessagesFromMe')
MessagesSocketFromNamSpace.on('connection',MessagesControllerFromMe.messages_me_from)
const UserProfileController = require('./Controllers/UserProfileControllers/UserProfileController')
/// - User Profile NameSpace
const UserProfileNameSpace = io.of('/Profile')
UserProfileNameSpace.on('connection',UserProfileController.userProfile)
/// - Settings Socket Bağlantısı Modülü
const SettingsController = require('./Controllers/UserSettingsController/UserSettingsController');
const { Socket } = require('dgram');
/// - User Profile NameSpace - YENİ 
const SettingsNameSpace = io.of('/Settings')
SettingsNameSpace.on('connection',SettingsController.settings)



http.listen(process.env.PORT || 3000, ()=>{
    console.log('🌎 SERVER.JS - HTTP CONNECTED');
});