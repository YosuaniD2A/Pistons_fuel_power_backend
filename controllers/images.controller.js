const { connectionAws } = require("../configs/aws.config");
const { insertImageModel, updateImageModel, deleteImageModel, getImageModel, getAllImageModel, insertLinkImageModel, deleteLinkImageModel, updateImageWithURL2Model } = require("../models/images.model");
const { uploadOneImage } = require("../util/upload");


const addImage = async (req, res) => {
    try {
        const s3 = connectionAws();
        const url = req.body.img_url;
        let img_url2 = '';

        const [data] = await insertImageModel(req.body);

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
                process.env.BUCKET_PRODUCTS,
                "image/png",
                s3
            );

            img_url2 = uploadedImage.Location;

            // Insertar en la BD, en su correspondiente fila
            await updateImageWithURL2Model(data.insertId, { img_url2 });

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

const updateImage = async (req, res) => {
    try {
        const [data] = await updateImageModel(req.params.id, req.body);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const deleteImage = async (req, res) => {
    try {
        const [data] = await deleteImageModel(req.params.id);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getImage = async (req, res) => {
    try {
        const [data] = await getImageModel(req.params.id);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const getAllImages = async (req, res) => {
    try {
        const [data] = await getAllImageModel();

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

//----------------------------------------------------

const addLinkImage = async (req, res) => {
    try {
        const [data] = await insertLinkImageModel(req.body);

        res.send({
            data
        });

    } catch (error) {
        res.status(500).json({
            msg: error.message,
        });
    }
}

const deleteLinkImage = async (req, res) => {
    try {
        const [data] = await deleteLinkImageModel(req.params.id);

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
    addImage,
    updateImage,
    deleteImage,
    getImage,
    getAllImages,

    addLinkImage,
    deleteLinkImage
};