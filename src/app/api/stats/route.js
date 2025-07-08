// src/app/api/stats/route.js
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import Purchase from "@/models/Purchase";

export async function GET() {
  try {
    await connectMongo();

    // Contar usuarios registrados
    const userCount = await User.countDocuments();

    // Obtener todas las compras
    const purchases = await Purchase.find();

    let totalProducts = 0;
    let totalRevenue = 0;

    // Mapa para agrupar por productName
    const productMap = new Map();

    for (const purchase of purchases) {
      for (const item of purchase.items) {
        totalProducts += item.quantity;
        totalRevenue += item.quantity * item.price;

        const existing = productMap.get(item.productName) || { productName: item.productName, totalQuantity: 0, totalAmount: 0 };
        existing.totalQuantity += item.quantity;
        existing.totalAmount += item.quantity * item.price;
        productMap.set(item.productName, existing);
      }
    }

    const purchasesDetail = Array.from(productMap.values());

    const stats = {
      userCount,
      totalProducts,
      totalRevenue,
      purchasesDetail // nuevo campo con el desglose por producto
    };

    return new Response(JSON.stringify(stats), { status: 200 });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    return new Response(JSON.stringify({ message: "Error interno del servidor." }), { status: 500 });
  }
}
