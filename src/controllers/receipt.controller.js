import receiptModel from '../models/receipt.models';


module.exports = {
findMany: async function (req, res) {
    try {
        let modelRes = await receiptModel.findMany();
        return res.status(modelRes.status ? 200 : 213).json(modelRes)
    } catch (err) {
        return res.status(500).json({
            message: "Lỗi controller!"
        })
    }
}
}