import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

module.exports = {
    findMany: async function () {
        try {
            let receipts = await prisma.receipts.findMany({
                include: {
                    user: true,
                    receipt_details: true,
                    receipt_details: {
                        include: {
                            product: true,
                        }
                    }
                }
            })

            return {
                status: true,
                message: "ok!",
                data: receipts
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi model!"
            }
        }
    },
}