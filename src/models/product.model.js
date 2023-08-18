import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

module.exports = {
    findMany: async function() {
        try {
            const result = await prisma.products.findMany({
                include: {
                    product_pictures: true,
                },
            })

            return {
                status: true,
                message: "Thêm sản phẩm thành công!",
                data: result
            }
        }catch(err) {
           // console.log("err", err)
            return {
                status: false,
                message: "Lỗi model!"
            }
        }
    },
    findById: async function(product_id) {
        try {
            const result = await prisma.products.findUnique({
                where: {
                    id: Number(product_id)
                },
                include: {
                    product_pictures: true
                }
            })

            return {
                status: true,
                message: "Lấy thành công!",
                data: result
            }
        }catch(err) {
           // console.log("err", err)
            return {
                status: false,
                message: "Lỗi model!"
            }
        }
    },
    // Tạo một sản phẩm mới
    create: async function (newProduct) {
        try {
            const product = await prisma.products.create({
                data: newProduct
            });
            return {
                status: true,
                message: "Thêm sản phẩm thành công!",
                data: product
            };
        } catch (err) {
            console.log("err", err);
            return {
                status: false,
                message: "Lỗi không xác định!"
            };
        }
    },
    // Đọc danh sách sản phẩm với các tùy chọn kèm theo
    readMany: async function (status = undefined) {
        try {
            let products = await prisma.products.findMany();
            return {
                status: true,
                message: "Lấy danh sách sản phẩm thành công!",
                data: products
            };
        } catch (err) {
            console.log("err",err);
            return {
                status: false,
                message: "Lỗi không xác định"
            };
        }
    },
    searchByName: async function (searchKey) {
       // console.log("da vao day")
        
        try {
            let products = await prisma.products.findMany(
                {
                    where: {
                        name: {
                            contains: searchKey,
                            // mode: 'insensitive'
                        }
                    }
                }
            )
            return {
                status: true,
                message: "Search thành công!",
                data: products
            }
        } catch (err) {
            console.log("err", err);
            return {
                status: false,
                message: "Search thất bại!"
            }
        }
    },
    deleteProduct: async function(productId){
        try {
            let products=await prisma.products.delete({
                where:{
                    id:productId
                }
            })
            return{
                status:true,
                message:"Xóa sản phẩm thàn công !"
            }
        } catch (error) {
            console.log("error",error);
            
        }
        return{
            status:false,
            message:"Xóa sản phẩm thất bại"
        }
   },
   editProduct:async (productId,updateProductData)=>{
        try {
            const result=await prisma.products.update({
                where:{
                    id:productId
                },
                data:updateProductData
            })
            return {
                status:true,
                message:"Cập nhập sản phẩm hành công "
            }
        } catch (error) {
            return {
                status:false,
                message:"Cập nhập sản phẩm thất bại "
            }
            
        }
    
   },
   createReceipt: async function (data) {
    try {
        let receipt = prisma.receipts.create({
            data: {
                ...data.receiptInfor,
                receipt_details: {
                    create: data.receiptDetails
                },
            }
        })

        const deleteCartDetail = prisma.cart_details.deleteMany({
            where: {
                cart_id: data.receiptInfor.receipt_code
            }
        })

        const deleteCart = prisma.carts.delete({
            where: {
                id: data.receiptInfor.receipt_code,
            },
        })

        const transaction = await prisma.$transaction([receipt, deleteCartDetail, deleteCart])

        return {
            status: true,
            message: "Ok nhé",
            data: receipt
        }
    } catch (err) {
        console.log("lỗi createReceipt", err)
        return {
            status: false,
            message: "lỗi createReceipt model"
        }
    }
}
   
    
}
