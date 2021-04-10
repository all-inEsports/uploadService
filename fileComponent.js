const awsCloudFront = require('aws-cloudfront-sign');
const awsSDK = require('aws-sdk');
const fs = require('fs');

function uploadFile(filename, file) {
    awsSDK.config.update({ accessKeyId: process.env.AWS_ACCESS, secretAccessKey: process.env.AWS_SECRET });
    const s3 = new awsSDK.S3();
    return new Promise(function (resolve, reject) {
        
            s3.putObject({
                Bucket: 'cf-simple-s3-origin-cloudfrontfors3-367165618392',
                Key: filename,
                Body: file,
                ACL: 'public-read'
            }, function (err, data) {
                if (err)
                    reject(err);
                resolve("succesfully uploaded");
            });
        });
}
module.exports = {uploadFile}