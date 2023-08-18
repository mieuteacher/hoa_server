import express from "express";
const router = express.Router();

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const categories = [
    {title: "Hoa Cưới", avatar: "https://png.pngtree.com/png-vector/20200820/ourlarge/pngtree-svg-wedding-hand-drawn-bouquet-elements-png-image_2328537.jpg"},
    {title: "Hoa Bó", avatar: "hoabo.jpg"},
    {title: "Hoa Ban Ngày", avatar: "hoabanngay.jpg"},
    {title: "Hoa Bỏ 1", avatar: "hoabo.jpg"},
    {title: "Hoa Ban Đêm", avatar: "hoabandem.jpg"},
    {title: "Hoa Phong Thủy", avatar: "hoaphongthuy.jpg"}
]

router.use("/create-default-data", async (req, res) => {
    try {
        let messageString = 'Tạo dữ liệu thành công cho các bảng sau: ';
        // create data categories
        await prisma.categories.createMany({
            data: categories,
            skipDuplicates: true,
        })
        messageString += "Categories "

        return res.status(200).json(
            {
                message: messageString
            }
        )
    }catch(err) {
        return res.status(500).json(
            {
                message: "Lỗi cú pháp!"
            }
        )
    }
})

module.exports = router;