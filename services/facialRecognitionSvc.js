const Promise = require('bluebird');
const unirest = require('unirest');

const constants = require('../config');

exports.enrollUser = function enrollUser(image_url, user_name){
    return new Promise((resolve, reject) => {

        unirest
            .post(constants.enroll_url)
            .headers({
                'Content-Type': 'application/json',
                'app_id': '029aa947',
                'app_key': '52ebec2d60c076f86dd1198e14fc9cff'
            })
            .send({
                "image": image_url,
	            "subject_id": user_name,
	            "gallery_name": "IOT"
            })
            .timeout(26000)
            .end((response) => {
                if(response.body === null){
                    reject({ code: 400, message: 'Failed'});
                }
                console.log(response.body);
                resolve(response);
            });

    });
};

exports.recognizeUser = function recognizeUser(image_url){
    return new Promise((resolve, reject) => {

        unirest
            .post(constants.recongition_url)
            .headers({
                'Content-Type': 'application/json',
                'app_id': '029aa947',
                'app_key': '52ebec2d60c076f86dd1198e14fc9cff'
            })
            .send({
                "image": image_url,
                "gallery_name": "IOT",
                "threshold": "0.65"
            })
            .timeout(26000)
            .end((response) => {
                if(response.body === null){
                    reject({ code: 400, message: 'Failed'});
                }
                console.log(response.body);
                if(response.body.Errors){
                    reject({ code:421, message: 'The user doesn\'t exist in the userbase.' })
                }
                const result = response.body.images;
                if(result[0].transaction.status === 'failure'){
                    reject({ code: 422, message: 'The user doesn\'t exist in the userbase.' })
                }
                resolve(result[0]);
            });
    });
}