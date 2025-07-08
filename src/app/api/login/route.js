// app/api/login/route.js
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { usernameOrEmail, password } = await req.json();

  if (!usernameOrEmail || !password) {
    return new Response(
      JSON.stringify({ message: "Todos los campos son obligatorios." }),
      { status: 400 }
    );
  }

  try {
    await connectMongo();

    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Credenciales inválidas." }),
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Credenciales inválidas." }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Inicio de sesión exitoso.",
        user: { username: user.username, email: user.email },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el login:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor." }),
      { status: 500 }
    );
  }
}
