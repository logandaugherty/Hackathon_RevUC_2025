import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "lol",
  database: "rxrecruit",
};

export async function POST(req) {
  try {
    const requestBody = await req.json();

    console.log("Received Data:", requestBody); // Debugging log

    const {
      doctor_id,
      title,
      description,
      age_range = "Not specified",
      gender = "Any",
      medical_condition = "Not specified",
      location = "Not specified",
      requirements = "Not specified",
      pay = "Not specified",
    } = requestBody;

    if (!doctor_id || !title || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const connection = await mysql.createConnection(dbConfig);

    const [result] = await connection.execute(
      "INSERT INTO requirements (doctor_id, title, description, age_range, gender, medical_condition, location, requirements, pay) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        doctor_id,
        title,
        description,
        age_range,
        gender,
        medical_condition,
        location,
        requirements,
        pay,
      ]
    );

    await connection.end();

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
