import productModel from '../models/product.model';
import {uploadFileToStorage} from '../firebase';
import fs from 'fs';

module.exports = {
    findById: async function (req, res) {
        try {
            let result = await productModel.findById(parseInt(req.params.id));

            return res.status(200).json({
                message: result.message,
                data: result.data
            })

        } catch (err) {
            console.log("err", err);
            return res.status(500).json({
                message: "Lỗi không xác định!"
            })
        }
    },
    findMany: async function(req, res) {
        try {
            let modelRes = await productModel.findMany();
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        }catch(err) {
            return res.status(500).json({
                message: "Lỗi controllers!"
            });
        }
    },
    create: async function(req, res) {
        try {
            let productInforFormat = JSON.parse(req.body.product_infor);

            let newProduct = {
             ...productInforFormat,
            }
             
             // xử lý avatar
             let avatarProcess = await uploadFileToStorage(req.file, "products", fs.readFileSync(req.file.path));
             newProduct.avatar = avatarProcess;
             fs.unlink(req.file.path, (err) => {})
             
             let modelRes = await productModel.create(newProduct);

             return res.status(modelRes.status ? 200 : 213).json(modelRes);
        }catch(err) {
            console.log("err",err)
            return res.status(500).json({
                message: "sap server"
            })
        }
    },
    readMany: async function (req, res) {
        try {
            let result = await productModel.readMany(req.query.status);
            if (result.status) {
                return res.status(200).json({
                    message: result.message,
                    data: result.data
                })
            }
            return res.status(500).json({
                message: result.message
            })
        } catch (err) {
            console.log("err",err);
            return res.status(500).json({
                message: "Lỗi không xác định!"
            })
        }
    },
    searchByName: async function (req, res) {
         console.log("Da vao controller !!!", req.query.search);
        try {
            // Find by name
            if (req.query.search) {
                let result = await productModel.searchByName(req.query.search)
                return res.status(result.status ? 200 : 221).json(result)
            }

            // Find all
            let result = await productModel.readMany()
            return res.status(result.status ? 200 : 221).json(result)

        } catch (err) {
            return res.status(500).json(
                {
                    message: "Loi khong xac dinh !!!"
                }
            )

        }
    },
    deleteProduct:async function(req,res){
       // console.log("da vao ");
        let result =await productModel.deleteProduct(parseInt(req.params.id))
            if (result.status) {
                return res.status(200).json(result)   
            }else{
                res.status(400).json(result)
            }
       
    },
    editProduct: async function(req, res) {
        try {
            const productId = parseInt(req.params.id);
            const updateProductData = req.body;
            let result = await productModel.editProduct(productId, updateProductData);
            if (result.status) {
                return res.status(200).json({ message: "Cập nhật sản phẩm thành công" });
            } else {
                return res.status(500).json({ message: "Cập nhật sản phẩm thất bại" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Server sập" });
        }
    }
    
}