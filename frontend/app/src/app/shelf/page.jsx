// app/shelf/page.jsx
import { getServerSession } from "next-auth/next"; // サーバーサイドでセッションを取得
import { authOptions } from "../../../auth"; // authOptionsを適切にインポート
import { redirect } from "next/navigation";

export default async function Shelf() {
  const session = await getServerSession(authOptions); // サーバーサイドでセッションを取得

  // セッションがない場合はルートにリダイレクト
  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h1>Shelf Page</h1>
    </div>
  );
}
