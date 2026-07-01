import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || !Array.isArray(body)) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
    }

    // Resolve path to issues.json
    const filePath = path.join(process.cwd(), "src", "lib", "issues.json");

    // Write the JSON array back to the file with formatting
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Lỗi khi ghi file issues.json:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
