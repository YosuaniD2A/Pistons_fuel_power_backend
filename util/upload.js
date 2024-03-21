const { Upload } = require('@aws-sdk/lib-storage');

const uploadOneImage = async (imgBuffer, productName, bucket, s3) => {
    const paramsImg = {
        Bucket: bucket,
        Key: `${Date.now().toString()}-${productName}`,
        Body: imgBuffer,
        ContentType: "image/png", // Cambia esto según el tipo de imagen
    };

    const parallelUploads3 = new Upload({ client: s3, params: paramsImg }); 
    const result = await parallelUploads3.done();
    
    return result;
};

module.exports = {
    uploadOneImage
}