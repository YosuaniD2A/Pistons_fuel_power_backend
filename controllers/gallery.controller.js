const { connectionAws } = require("../configs/aws.config");
const { insertImageGalleryModel, updateImageGalleryModel, deleteImageGalleryModel, getImageGalleryModel, getAllImageGalleryModel, updateImageGalleryWithURL2Model } = require("../models/gallery.model");
const { uploadOneImage } = require("../util/upload");


const addImageGallery = async (req, res) => {
    try {
        const s3 = connectionAws();
        const url = req.body.img_url;
        let img_url2 = '';

        const [data] = await insertImageGalleryModel(req.body);

        // Adicionar la imagen a AWS
        const response = await fetch(url);
        if (!response.ok) {
            return {
                error: `Failed to fetch image`
            }
        } else {
            // Fragmentar la URL para obtener el nombre de la imagen
            const segments = url.split('/');
            const name = segments[segments.length - 1].split('.')[0];

            // Obtener el buffer de imagen
            const imageBuffer = await response.arrayBuffer();

            // Guardar imagen en S3 y obtener la url
            const uploadedImage = await uploadOneImage(
                Buffer.from(imageBuffer),
                name,
                process.env.BUCKET_GALLERY,
                "image/jpg",
                s3
            );

            img_url2 = uploadedImage.Location;

            // Insertar en la BD, en su correspondiente fila
            await updateImageGalleryWithURL2Model(data.insertId, { img_url2 });

        }

        res.send({
            data,
            img_url2
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const updateImageGallery = async (req, res) => {
    try {
        const [data] = await updateImageGalleryModel(req.params.id, req.body);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const deleteImageGallery = async (req, res) => {
    try {
        const [data] = await deleteImageGalleryModel(req.params.id);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getImageGallery = async (req, res) => {
    try {
        const [data] = await getImageGalleryModel(req.params.id);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllImagesGallery = async (req, res) => {
    try {
        const [data] = await getAllImageGalleryModel();

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

module.exports = {
    addImageGallery,
    updateImageGallery,
    deleteImageGallery,
    getImageGallery,
    getAllImagesGallery

};