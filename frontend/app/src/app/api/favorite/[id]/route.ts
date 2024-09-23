import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route'; // 認証オプションを正しいパスからインポート

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // paramsからidを取得

  // セッションを取得
  const session = await getServerSession({ req: request, ...authOptions });

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'セッションが見つかりませんでした' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const token = session.jwt; // セッションからトークンを取得
  console.log('Current token--api/favorite:', token);

  // お気に入りを更新する処理
  const url = `http://backend:3000/api/v1/favorite?article_id=${id}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  console.log("favorite api :", response);

  if (response.ok) {
    console.log("response api ok:", response);
    return NextResponse.json({ message: 'お気に入りを更新しました' });
  } else {
    console.log("favorite api error:");
    return new NextResponse(JSON.stringify({ error: 'お気に入りの更新に失敗しました' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}









// DELETEリクエストの処理
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const session = await getServerSession({ req: request, ...authOptions });
  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'セッションが見つかりませんでした' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const token = session.jwt;
  console.log('Current token--api/favorite:', token);

  // お気に入りを削除する処理
  const url = `http://backend:3000/api/v1/favorite/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  console.log("favorite delete api :", response);
  if (response.ok) {
    return NextResponse.json({ message: 'お気に入りを削除しました' });
  } else {
    return new NextResponse(JSON.stringify({ error: 'お気に入りの削除に失敗しました' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}