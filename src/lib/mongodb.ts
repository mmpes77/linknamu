import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "linknamu";

// 개발 모드에서는 코드가 바뀔 때마다 모듈이 다시 로드되므로,
// 연결을 globalThis에 보관해 연결이 계속 늘어나는 것을 막습니다.
const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

/** MONGODB_URI가 설정되지 않았으면 null을 돌려줍니다. */
export async function getDb(): Promise<Db | null> {
  if (!uri) return null;

  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((error) => {
      // 연결에 실패하면 다음 요청에서 다시 시도할 수 있도록 비워 둡니다.
      globalForMongo._mongoClientPromise = undefined;
      throw error;
    });
  }

  const client = await globalForMongo._mongoClientPromise;
  return client.db(dbName);
}
