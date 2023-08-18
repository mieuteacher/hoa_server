import categoryModel from '../models/category.model';

module.exports = {
    findByCategory: async function (req, res) {
        try {
            let result = await categoryModel.findByCategory(parseInt(req.params.category_id));

            return res.status(200).json({
                message: result.message,
                data: result.data
            })

        } catch (err) {
            return res.status(500).json({
                message: "Lỗi không xác định!"
            })
        }
    },
    findAllCategories: async (req, res) => {
        try {
            let modelRes = await categoryModel.findAll()
            console.log("modelRes", modelRes);

            return res.status(modelRes.status ? 200 : 214).json(modelRes)

        } catch (err) {
            return res.status(500).json(
                {
                    message: "Bad request products !"
                }
            )
        }
    },
    create: async function(req, res) {
        try {
            let result = await categoryModel.create(req.body);
            if (result.status) {
                return res.status(200).json({
                    message: result.message,
                    data: result.data
                })
            }

            return res.status(500).json({
                message: result.message
            })

        }catch(err) {
            return res.status(500).json({
                message: "Lỗi không xác định!"
            })
        }
    },
    readMany: async function(req, res) {
        try {
            let result = await categoryModel.readMany(req.query.status);
            if (result.status) {
                return res.status(200).json({
                    message: result.message,
                    data: result.data
                })
            }

            return res.status(500).json({
                message: result.message
            })

        }catch(err) {
            return res.status(500).json({
                message: "Lỗi không xác định!"
            })
        }
    },
    update: async function(req, res) {
        try {
            let result = await categoryModel.update(req.params.categoryId, req.body);

            if (result.status) {
                return res.status(200).json({
                    message: result.message,
                    data: result.data
                })
            }

            return res.status(500).json({
                message: result.message
            })

        }catch(err) {
            return res.status(500).json({
                message: "Lỗi không xác định!"
            })
        }
    },
   
}