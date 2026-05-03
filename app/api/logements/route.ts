import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Logement } from "@/types/logement";

const DATA_PATH = path.join(process.cwd(), "data", "logements.json");

export async function GET() {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch (error) {
    console.error("Erreur GET logements:", error);
    return NextResponse.json({ error: "Erreur lecture fichier" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updated: Logement = await request.json();

    if (!updated?.id) {
      return NextResponse.json({ error: "id manquant" }, { status: 400 });
    }

    const raw = await fs.readFile(DATA_PATH, "utf-8");
    const data = JSON.parse(raw) as { logements: Logement[] };

    const index = data.logements.findIndex((l) => l.id === updated.id);
    if (index === -1) {
      return NextResponse.json({ error: "Logement introuvable" }, { status: 404 });
    }

    data.logements[index] = updated;
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({ success: true, logement: updated });
  } catch (error) {
    console.error("Erreur PUT logement:", error);
    return NextResponse.json({ error: "Erreur écriture fichier" }, { status: 500 });
  }
}
