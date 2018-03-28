const Promise = require('bluebird');

const User = require('../resources/users');

exports.createUser = function createUser(data){
    return new Promise((resolve, reject) => {
        console.log(data);
        const userData = {
            name: data.name,
            email: data.email || '',
            mobile_number: data.mobile_number,
            password: data.password || '',
            role: data.role,
            permissions: {
                start_time: data.permissions.start_time || '',
                end_time: data.permissions.end_time || '',
            },
            facial_images: data.facial_images || [],
            fcm_token: data.fcm_token || '',
        };
        if(data.permissions.start_date && data.permissions.end_date){
            user.permissions.start_date = data.permissions.start_date;
            user.permissions.end_date = data.permissions.end_date;
        }
        console.log(userData);
        const user = new User(userData);
        if(user.validateSync()){
            reject({ code: 403, message: 'Bad Request' });
            return false;
        }
        user.save((err, result) => {
            if (err) {
                reject({ code: 422, message: err.message });
                return false;
            }
            resolve(result);
        });
    });
};

exports.getUsers = function getUsers(){
    return new Promise((resolve, reject) => {
        User.find({}, {}, (err, result) => {
            if(err){
                reject({ code: 422, message: err.message });
                return false;
            }
            resolve(result);
        });
    });
};

exports.findUser = function findUser(_id){
    return new Promise((resolve, reject) => {
        User.findById(_id, (err, result) => {
            if(err){
                reject({ code: 422, message: err.message });
                return false;
            }
            resolve(result);
        });
    }); 
};

exports.deleteUser = function deleteUser(_id){
    return new Promise((resolve, reject) => {
        User.findByIdAndRemove(_id, (err, user) => {
            if(err){
                reject({ code: 422, message: err.message });
                return false;
            }
            resolve(user);
        });
    });
}

exports.checkTimePermission = function checkTimePermission(_id){
    return new Promise((resolve, reject) => {
        let thisUser;
        this.findUser(_id)
            .then((user) => {
                thisUser = user;
                if(thisUser.role === 'owner' || thisUser.role === 'family'){
                    resolve({ message: 'Permission Granted.', data: { user: thisUser } });
                }
                if(thisUser.role === 'guest'){
                    let date = new Date();
                    let startDate = new Date(thisUser.permissions.start_date);
                    let endDate = new Date(thisUser.permissions.end_date);
                    if(date >= startDate && date <= endDate){
                        resolve({ message: 'Permission Granted.', data: { user: thisUser } });
                    }
                    else{
                        resolve({ code: 450, message: 'No valid permission for given date and time.'});
                    }
                }
                if(thisUser.role === 'temp'){
                    let date = new Date();
                    let startTime = thisUser.permissions.start_time;
                    let endTime = thisUser.permissions.end_time;
                    let s =  startTime.split(':');
                    let dt1 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));
                    let e =  endTime.split(':');
                    let dt2 = new Date(date.getFullYear(), date.getMonth(), date.getDate(),parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));
                    if(date >= dt1 && date <= dt2){
                        resolve({ message: 'Permission Granted.', data: { user: thisUser } });
                    }
                    else{
                        resolve({ code: 450, message: 'No valid permission for given date and time.'});
                    }
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};
