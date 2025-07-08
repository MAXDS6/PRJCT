import connectMongo from "../../../lib/mongodb";
import Product from "../../../models/Product";

export async function POST(req) {
  try {
    await connectMongo();
    const formData = await req.formData();
    const name = formData.get('name');
    const price = formData.get('price');
    const photo = formData.get('photo');

    if (!name || !price || !photo) {
      return new Response(
        JSON.stringify({ message: "Todos los campos son obligatorios." }), 
        { status: 400 }
      );
    }

    if (isNaN(price)) {
      return new Response(
        JSON.stringify({ message: "El precio debe ser un número." }), 
        { status: 400 }
      );
    }

    const photoUrl = "https://via.placeholder.com/150";
    const product = await Product.create({ name, price: parseFloat(price), photoUrl });

    return new Response(
      JSON.stringify({ message: "Producto creado con éxito.", product }), 
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear producto:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor." }), 
      { status: 500 }
    );
  }
}
