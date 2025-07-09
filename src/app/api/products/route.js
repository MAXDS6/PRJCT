import { v2 as cloudinary } from "cloudinary";
import connectMongo from "../../../lib/mongodb";
import Product from "../../../models/Product";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    await connectMongo();
    const products = await Product.find().lean();

    return new Response(
      JSON.stringify({ products }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return new Response(
      JSON.stringify({ message: "Error al obtener productos." }),
      { status: 500 }
    );
  }
}

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

    // Convertir archivo a base64 para enviarlo a Cloudinary
    const buffer = await photo.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const dataUri = `data:${photo.type};base64,${base64Image}`;

    // Subir imagen a Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "productos",
    });

    const photoUrl = uploadResult.secure_url;
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
