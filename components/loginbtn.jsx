import { useSession, signIn, signOut } from "next-auth/react";
export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    console.log("Session", JSON.stringify(session, null, 2));
    return (
      <>
        {session.user.name} <br />
        {session.user.email}
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else
    return (
      <>
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
}
