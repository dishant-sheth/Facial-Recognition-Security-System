const Promise = require('bluebird');
const unirest = require('unirest');

const constants = require('../config');

exports.enrollUser = function enrollUser(image_url, user_name){
    return new Promise((resolve, reject) => {

        const body = {
            image: image_url,
            gallery_name: "IOT",
            subject_id: user_name
        };

        unirest
            .post(constants.enroll_url)
            .headers({
                'Content-Type': 'application/json',
                'app_id': '029aa947',
                'app_key': '52ebec2d60c076f86dd1198e14fc9cff'
            })
            .form(body)
            .timeout(26000)
            .end((response) => {
                if(response.body == null){
                    reject({ code: 400, message: 'Failed'});
                }
                console.log(response);
                resolve(response);
            });

    });
};