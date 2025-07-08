// app/api/register/route.js
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { email, username, password } = await req.json();

  if (!email || !username || !password) {
    return new Response(
      JSON.stringify({ message: "Todos los campos son obligatorios." }),
      { status: 400 }
    );
  }

  try {
    await connectMongo();

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          message: "El usuario o correo ya está registrado.",
        }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    return new Response(
      JSON.stringify({
        message: "Usuario registrado exitosamente.",
        user: { email: newUser.email, username: newUser.username },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en el registro:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor." }),
      { status: 500 }
    );
  }
}
