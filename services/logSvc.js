const Promise = require('bluebird');

const Log = require('../resources/logs');

exports.addLog = function addLog(data){
    return new Promise((resolve, reject) => {
        const logData = {
            user_id: data.user_id
        };
        const log = new Log(logData);
        if(log.validateSync()){
            reject({ code: 403, message: 'Bad Request' });
            return false;
        }
        log.save((err, result) => {
            if (err) {
                reject({ code: 422, message: err.message });
                return false;
            }
            resolve(result);
        });
    });
};