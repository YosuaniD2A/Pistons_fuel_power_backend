const { connectionAws } = require("../configs/aws.config");
const { getImageWithoutURl2Model, updateImageWithURL2Model } = require("../models/images.model");
const { uploadOneImage } = require("../util/upload");


const uploadProductsImages = async (req, res) => {
    try {
        // const url = req.body.urlImage;
        const s3 = connectionAws();
        let imageUrlLocation = '';
        let imgWhitError = []

        const [imgWhitoutURL2] = await getImageWithoutURl2Model();

        const migrated = await Promise.all(imgWhitoutURL2.slice(0, 3).map(async (image) => {
            const response = await fetch(image.img_url);
            if (!response.ok) {
                imgWhitError.push(image.id)
                return {
                    error: `Failed to fetch image`
                }
            } else {
                // Fragmentar la URL para obtener el nombre de la imagen
                const segments = image.img_url.split('/');
                const name = segments[segments.length - 1].split('.')[0];

                // Obtener el buffer de imagen
                const imageBuffer = await response.arrayBuffer();

                // Guardar imagen en S3 y obtener la url
                const uploadedImage = await uploadOneImage(
                    Buffer.from(imageBuffer),
                    name,
                    process.env.BUCKET_TEST,
                    s3
                );

                imageUrlLocation = uploadedImage.Location;

                // Insertar en la BD, en su correspondiente fila
                await updateImageWithURL2Model(image.id, {imageUrlLocation});

                return {
                    id: image.id,
                    url2: imageUrlLocation
                }
            }
        }));

        let conteo = migrated.reduce((acc, obj) => {
            if (obj.hasOwnProperty('error')) {
                if (obj.error) {
                    acc.conError++;
                } else {
                    acc.sinError++;
                }
            } else {
                acc.sinError++;
            }
            return acc;
        }, { conError: 0, sinError: 0 });

        res.status(200).json({
            msg: {
                processed_images: migrated.length,
                success: conteo.sinError,
                error: conteo.conError,
                images_with_error: imgWhitError
            }
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

const uploadGalleryImages = async (req, res) => {
    try {


        res.send({
            data
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
}

module.exports = {
    uploadProductsImages,
    uploadGalleryImages
}