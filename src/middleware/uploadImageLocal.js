export const uploadSingleFile = (req, res, next) => {
        console.log(req.file);
        req.url_image = req.file.path
        next()
};
export const uploadMultipleFile = (req, res) => {
        return res.send(req.files)
};

