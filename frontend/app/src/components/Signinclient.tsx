// import { auth, signIn, signOut } from "../../auth";
// import React from "react";


// async function AppBar() {
//   const session = await auth();

//   return (
//     <div className="p-4  flex items-center justify-end gap-4">
//       <div>
//         {session && session.user ? (
//           <div className="flex items-center gap-4">
//             {/* サインアウトボタン */}
//             <form
//               action={async () => {
//                 "use server";
//                 await signOut();
//               }}
//             >
//               <button
//                 type="submit"
//                 className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-full "
//               >
//                 Sign Out
//               </button>
//             </form>
//           </div>
//         ) : (
//           <form
//             action={async () => {
//               "use server";
//               await signIn("google");
//             }}
//           >
//             <button
//               type="submit"
//               className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-full "
//             >
//               Sign In
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AppBar;

// src/app/appbar.jsx




// src/app/appbar.jsx
// src/app/appbar.jsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import React from "react";

async function AppBar() {
  // セッション情報を取得する
  const session = await getServerSession(authOptions);

  return (
    <div className="p-4 flex items-center justify-end gap-4">
      <div>
        {session && session.user ? (
          <div className="flex items-center gap-4">
            {/* サインアウトボタン */}
            <SignOutButton />
          </div>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
}

export default AppBar;
