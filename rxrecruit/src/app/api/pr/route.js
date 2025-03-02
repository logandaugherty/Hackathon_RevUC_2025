import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

// Database connection
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "lol",
  database: "rxrecruit",
};

export async function POST(req) {
  try {
    const {
      doctor_id,
      title,
      description,
      age_range,
      gender,
      medical_condition,
    } = await req.json();
    const connection = await mysql.createConnection(dbConfig);

    // Insert requirement into the database
    const [result] = await connection.execute(
      "INSERT INTO requirements (doctor_id, title, description, age_range, gender, medical_condition) VALUES (?, ?, ?, ?, ?, ?)",
      [doctor_id, title, description, age_range, gender, medical_condition]
    );

    await connection.end();

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
