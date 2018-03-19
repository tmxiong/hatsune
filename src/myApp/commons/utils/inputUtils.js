/**
 * Created by timxiong on 2018/3/19.
 */
module.exports = {
    _checkUserName(t) {
        if(t == '') {
            return[false,'用户名不能为空！']
        }else if(t.length < 3) {
            return[false,'用户名长度不能小少于3个字！']
        }else if(t.length > 16) {
            return[false,'用户名长度不能超过16个字！']
        } else {
            return[true,''];
        }
    },

    _checkPsd(t1,t2) {
        if(t1 == '') {
            return [false, '密码不能为空！'];
        }else if(t1.length < 6) {
            return [false, '密码长度不足6位'];
        }else if(t1 != t2) {
            return [false, '2次密码输入不一致'];
        }else {
            return [true,''];
        }
    },

    _checkEmail(t) {
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(t == '') {
            return [false, '邮箱不能为空！']
        } else if(!myreg.test(t)) {
            return [false, '邮箱格式不正确！']
        }else {
            return [true,''];
        }
    }

};