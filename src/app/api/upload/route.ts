import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. Session Auth Check
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    // 2. File size limit check (5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File size exceeds 5MB limit." }, { status: 400 });
    }

    // 3. MIME type validation
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, and WEBP images are allowed." },
        { status: 400 }
      );
    }

    // 4. File extension validation
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'tmp';
    const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
    if (!allowedExtensions.includes(fileExt)) {
      return NextResponse.json(
        { error: "Invalid file extension. Only jpg, jpeg, png, and webp are allowed." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Cryptographically safer random suffix
    const cryptoRandom = crypto.randomUUID().split("-")[0];
    const filename = `${Date.now()}-${cryptoRandom}.${fileExt}`;
    
    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    
    const path = join(uploadDir, filename);
    await writeFile(path, buffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "File upload failed." }, { status: 500 });
  }
}
