import connectMongo from "@/lib/mongodb";
import Purchase from "@/models/Purchase";

export async function POST(req) {
  try {
    await connectMongo();
    const { items, total } = await req.json();

    if (!items || !total) {
      return new Response(JSON.stringify({ message: "Datos incompletos." }), { status: 400 });
    }

    // Crear la compra en la base de datos
    const newPurchase = await Purchase.create({ items, total });

    return new Response(JSON.stringify({ message: "Compra registrada con éxito.", purchaseId: newPurchase._id }), { status: 201 });
  } catch (error) {
    console.error("Error al registrar la compra:", error);
    return new Response(JSON.stringify({ message: "Error interno del servidor." }), { status: 500 });
  }
}
