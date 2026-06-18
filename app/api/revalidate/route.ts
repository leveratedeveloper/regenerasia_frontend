import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const paths: string[] = body.paths ?? ["/"];

    paths.forEach((path) => revalidatePath(path));

    return NextResponse.json({ revalidated: true, paths });
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }
}
