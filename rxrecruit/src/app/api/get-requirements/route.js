import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "lol",
  database: "rxrecruit",
};

export async function GET() {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [requirements] = await connection.execute(
      "SELECT id, doctor_id, title, description, age_range, gender, medical_condition, requirements, pay, created_at FROM requirements ORDER BY created_at DESC"
    );

    await connection.end();

    console.log("Fetched Requirements:", requirements); // Debugging

    return NextResponse.json({ success: true, requirements });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
