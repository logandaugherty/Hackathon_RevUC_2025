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

    // Retrieve all requirements
    const [requirements] = await connection.execute(
      "SELECT * FROM requirements ORDER BY created_at DESC"
    );

    await connection.end();

    return NextResponse.json({ success: true, requirements });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
