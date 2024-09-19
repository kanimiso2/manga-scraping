import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  return (
    <div>
      <h1>サインイン</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {provider.name}でサインイン
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
