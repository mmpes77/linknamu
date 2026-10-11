import { getDb } from "@/lib/mongodb";
import { profile } from "@/data/profile";

type ClickDoc = {
  _id: string; // 링크 id
  count: number;
  updatedAt: Date;
};

const linkIds = new Set(profile.links.map((link) => link.id));

async function getClicks() {
  const db = await getDb();
  return db?.collection<ClickDoc>("clicks") ?? null;
}

/** 링크 클릭 1회를 기록합니다. body: { "linkId": "github" } */
export async function POST(request: Request) {
  let linkId: unknown;
  try {
    ({ linkId } = await request.json());
  } catch {
    return Response.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  if (typeof linkId !== "string" || !linkIds.has(linkId)) {
    return Response.json({ error: "존재하지 않는 링크입니다." }, { status: 400 });
  }

  try {
    const clicks = await getClicks();
    if (!clicks) {
      return Response.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
    }

    await clicks.updateOne(
      { _id: linkId },
      { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
      { upsert: true },
    );
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("클릭 수 기록 실패:", error);
    return Response.json({ error: "클릭 수를 기록하지 못했습니다." }, { status: 500 });
  }
}

/** 링크별 클릭 수를 돌려줍니다. 예: { "counts": { "github": 3, "blog": 0 } } */
export async function GET() {
  try {
    const clicks = await getClicks();
    if (!clicks) {
      return Response.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
    }

    const docs = await clicks.find({ _id: { $in: [...linkIds] } }).toArray();
    const counts = Object.fromEntries(profile.links.map((link) => [link.id, 0]));
    for (const doc of docs) counts[doc._id] = doc.count;

    return Response.json({ counts });
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}
