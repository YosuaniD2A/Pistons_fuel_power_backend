// const AWS = require('aws-sdk')
const { S3Client } = require('@aws-sdk/client-s3');

const connectionAws = () => {
    const options = {
        region: process.env.REGION_IMG,
        credentials: {
          accessKeyId: process.env.ACCESS_KEY_IMG,
          secretAccessKey: process.env.SECRET_ACCESS_KEY_IMG
        }
      };

    const s3Client = new S3Client(options);

    return s3Client
};

module.exports = {
    connectionAws
}