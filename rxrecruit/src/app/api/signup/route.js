// app/api/signup/route.js
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const {
      role,
      name,
      email,
      password,
      age,
      location,
      gender,
      allergies,
      company,
    } = await request.json();

    // Log the received role for debugging
    console.log("Received role:", role);

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to the MySQL database using environment variables
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    let query = "";
    let values = [];
    const roleLower = role.toLowerCase();

    if (roleLower === "patient") {
      query = `INSERT INTO users (role, name, email, password, age, location, gender, allergies)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      values = [roleLower, name, email, hashedPassword, age, location, gender, allergies];
    } else if (roleLower === "doctor" || roleLower === "enterprise") {
      query = `INSERT INTO users (role, name, email, password, company)
               VALUES (?, ?, ?, ?, ?)`;
      values = [roleLower, name, email, hashedPassword, company];
    } else {
      throw new Error("Invalid role: " + role);
    }

    const [result] = await connection.execute(query, values);
    await connection.end();

    return new Response(
      JSON.stringify({ success: true, id: result.insertId }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Sign up error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
