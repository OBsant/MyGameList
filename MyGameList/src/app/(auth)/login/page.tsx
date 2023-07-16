"use client";

import { auth } from "@/app/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmitLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const auth = getAuth();

    setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          auth.onAuthStateChanged((user) => {
            if (user) {
              router.push("/");
            } else {
            }
          });
        }
      );
    });
  };

  //LOGIN GOOGLE
  const handleSubmitGoogle = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setPersistence(auth, browserSessionPersistence).then(() => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        auth.onAuthStateChanged((user) => {
          if (user) {
            router.push("/");
          }
        });
      });
    });
  };

  return (
    <div className="flex justify-center flex-col gap-10 items-center h-screen bg-slate-900 text-lime-50">
      <h1 className="uppercase text-3xl font-semibold">Login</h1>
      <div className="w-96 flex flex-col items-center bg-slate-800 rounded-md py-10">
        <form onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
          <div>
            <p>Email Address</p>
            <input
              type="email"
              className="block p-2.5 w-full text-sm rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <p>Password</p>
            <input
              type="password"
              className="block p-2.5 w-full text-sm rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-center bg-purple-700 hover:bg-purple-800 rounded-md py-2 px-8"
          >
            login
          </button>
        </form>
        <div className="flex flex-col gap-4 py-4 items-center justify-center">
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-px my-8 border-0 bg-gray-700" />
            <span className="absolute px-3 font-medium -translate-x-1/2 bg-slate-800 left-1/2 text-white ">
              Or continue with
            </span>
          </div>
          <button
            onClick={handleSubmitGoogle}
            type="button"
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-[#4285F4]/55 mr-2 mb-2"
          >
            <svg
              className="w-4 h-4 mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fill-rule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clip-rule="evenodd"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
