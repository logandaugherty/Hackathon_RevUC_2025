// app/api/signin/route.js
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    // Parse the incoming JSON data
    const { email, password, role } = await request.json();

    // Connect to the MySQL database using environment variables
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    // Query for the user by email and role
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ? AND role = ?",
      [email, role]
    );
    await connection.end();

    if (rows.length === 0) {
      return new Response(JSON.stringify({ success: false, error: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = rows[0];

    // Compare the submitted password with the stored hashed password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return new Response(JSON.stringify({ success: false, error: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return user info (excluding the password)
    const userInfo = { id: user.id, role: user.role, name: user.name, email: user.email };
    return new Response(JSON.stringify({ success: true, user: userInfo }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Sign in error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
