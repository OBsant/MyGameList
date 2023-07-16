/* eslint-disable @next/next/no-img-element */
"use client";

import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "@/app/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import animationLoading from "../../../lottieAnimations/animationLoading.json";

export default function Description({ params }: { params: { slug: string } }) {
  const [dataGame, setDataGame] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, uid, params.slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDataGame(docSnap.data());
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [params.slug]);

  return (
    <div className="min-h-screen bg-slate-900 p-20">
      {dataGame === null ? (
        <div className=" flex justify-center items-center">
          <Lottie className="w-1/5" animationData={animationLoading} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-5">
          <img src={dataGame.img} alt="img" className="rounded-lg w-1/3" />
          <div className="w-3/4 flex flex-col bg-slate-800 text-lime-50 justify-center items-center p-5 rounded-md gap-2">
            <div className="flex gap-10 justify-between items-center w-full">
              <h1 className="font-semibold">
                {dataGame.title} | Score: {dataGame.score} | Status:{" "}
                {dataGame.status}
              </h1>
              <Link
                href={`../game/${params.slug}/`}
                className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
              >
                Edit
              </Link>
            </div>
            <hr className="w-full" />
            <p>{dataGame.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
