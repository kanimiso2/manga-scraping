// import { auth, signIn, signOut } from "../../auth";
// import Link from "next/link";
// import React from "react";
// import Image from 'next/image';

// async function AppBar() {
//   const session = await auth();
//   return (
//     <div className="p-2 bg-gradient-to-b from-slate-800 to-slate-600 flex gap-2 ">
//       <Link href={"/clientPage"}>Client Page</Link>
//       <Link href={"/serverPage"}>Server Page</Link>
//       <Link href={"/middlewareProtected"}>Middleware Protected Page</Link>
//       <div className="ml-auto">
//         {session && session.user ? (
//           <div className="flex gap-2">
//             <Image
//         src={session.user.image || '/default-avatar.png'} // デフォルト画像を追加
//         alt="User Avatar"
//         width={40}
//         height={40}
//         className="rounded-full"
//       />
//             <form
//               action={async () => {
//                 "use server";
//                 await signOut();
//               }}
//             >
//               <button type="submit">Sign Out</button>
//             </form>
//           </div>
//         ) : (
//           <form
//             action={async () => {
//               "use server";
//               await signIn("google");
              
//             }}
//           >
//             <button type="submit">Sign In</button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AppBar;
