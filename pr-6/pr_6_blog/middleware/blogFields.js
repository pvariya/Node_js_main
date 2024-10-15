function validateFields(req, res, next) {
    const { title, content, image, category } = req.body;

    if (!title || !content || !image || !category) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    next();
}

module.exports = validateFields
