"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Lottie from "lottie-react";
import animationHome from "../lottieAnimations/animationHome.json";
import Link from "next/link";

export default function Home() {
  const [gamesData, setGamesData] = useState<
    { id: string; data: DocumentData }[]
  >([]);
  const [userOnline, setUserOnline] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
        setUserOnline(uid);
        const fetchData = async () => {
          const querySnapshot = await getDocs(collection(db, uid));
          const games: { id: string; data: DocumentData }[] = [];
          querySnapshot.forEach((doc) => {
            games.push({ id: doc.id, data: doc.data() });
          });
          setGamesData(games);
        };

        fetchData();
      }
    });
  }, []);

  const handleDeleteItem = (id: string) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const deleteItem = async (id: string) => {
          await deleteDoc(doc(db, uid, id));
          setGamesData((prevGamesData) =>
            prevGamesData.filter((game) => game.id !== id)
          );
        };
        deleteItem(id);
      }
    });
  };

  return (
    <>
      <div className="min-h-screen bg-slate-900 px-20 sm:px-20">
        {gamesData === null || userOnline === "" ? (
          <div className=" flex flex-col justify-center items-center p-20">
            <Lottie className="w-72 lg:w-96" animationData={animationHome} />
            <Link
              className="text-2xl sm:text-3xl text-lime-50 text-center bg-purple-700 hover:bg-purple-800 rounded-md py-2 px-8"
              href="/register"
            >
              Join us
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-40 items-center">
            {gamesData.map((game) => (
              <Card
                key={game.id}
                idGame={game.id}
                data={game.data}
                onDelete={handleDeleteItem}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
