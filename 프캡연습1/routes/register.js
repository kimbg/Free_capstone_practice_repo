const express = require('express');
const router = express.Router();
const shortId = require('../config').shortId;
const db = require('../config').lowdb;



router.get('/',(req,res)=> {
    res.sendFile('C:/Users/김병관/Desktop/capstone_practice/register.html');
    console.log(1)
})

router.post('/',(req,res) => {
    console.log('이메일',req.body.email);
    console.log('이름',req.body.name);
    var user = {        
        id : shortId.generate(),
        email : req.body.email,
        pwd : req.body.password,
        uname : req.body.name
    }
    //DB에 값을 넣을때 password는 bcrypt를 하고 넣어야 한다.
    //하는방법 잘 모르면 생코Multi User Auth의 비밀번호 암호화 참조
    console.log('register.js 유저정보 : ',user);
    db.get('users').push(user).write(); //여기서 DB폴더의 db.json파일에 user값을 넣는다
    req.login(user,(err)=> {
        req.session.save(() => {
            return res.redirect('/');
        })
        //회원가입을 하면 자동으로 로그인 되도록 설정했다.
        //회원가입을 할시 req.login(user)의 user값이 serialize의 user매개변수로 가는듯하다.
        
    })
})


module.exports = router;