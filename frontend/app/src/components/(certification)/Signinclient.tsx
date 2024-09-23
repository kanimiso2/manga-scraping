import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth";
import SignInButton from "./SignInButton";
import ShelfIcon from "../ShelfIcon";
import UserIcon from "../UserIcon"; 
import Link from "next/link";
async function AppBar() {
  // セッション情報を取得する
  const session = await getServerSession(authOptions);

  return (
    <div className="p-4 flex items-center justify-between ">
      <div className="flex items-center gap-4"> 
        {session && session.user ? (
          <>
          <Link href="/shelf/1">
          <ShelfIcon />
        </Link>
          <UserIcon image={session.user.image} />
          </>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
}

export default AppBar;
