"use client";

import { useEffect, useState } from "react";
import { collection, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function NewGame({ params }: { params: { slug: string } }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [score, setScore] = useState("1");
  const [img, setImg] = useState("");
  const [status, setStatus] = useState("Playing");

  const router = useRouter();

  useEffect(() => {
    if (params.slug !== "add") {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          const docRef = doc(db, uid, params.slug);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const gameData = docSnap.data();
            setTitle(gameData.title);
            setDescription(gameData.description);
            setScore(gameData.score);
            setImg(gameData.img);
            setStatus(gameData.status);
          }
        }
      });

      return unsubscribe; // Remover o listener de autenticação ao desmontar o componente
    }
  }, [params.slug]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const gameData = {
        title: title,
        description: description,
        score: score,
        img: img,
        status: status,
      };

      if (params.slug === "add") {
        setTitle("");
        setDescription("");
        setScore("");
        setImg("");
        setStatus("");

        await addDoc(collection(db, uid), gameData);
      } else {
        const dataUpdate = doc(db, uid, params.slug);
        await updateDoc(dataUpdate, gameData);
        router.push(`../description/${params.slug}`);
      }
    }
  };

  return (
    <div className="flex justify-center flex-col gap-10 items-center h-screen bg-slate-900 text-lime-50 py-80">
      <h1 className="uppercase text-3xl">
        {params.slug === "add" ? "Add new game" : "Edit game"}
      </h1>
      <div className="w-70 sm:w-96 flex flex-col items-center bg-slate-800 rounded-md py-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full px-10"
        >
          <div className="Title">
            <h1>Title</h1>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block p-2.5 w-full text-sm rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="Description">
            <h1>Description</h1>
            <textarea
              value={description}
              name=""
              id=""
              onChange={(e) => setDescription(e.target.value)}
              className="block p-2.5 w-full text-sm rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div className="Score">
            <h1>Score</h1>
            <select
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <div className="Status">
              <h1>Status</h1>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Playing">Playing</option>
                <option value="Want play">Want play</option>
                <option value="Finished">Finished</option>
              </select>
            </div>
          </div>
          <div className="Img">
            <h1>Link image</h1>
            <input
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              className="block p-2.5 w-full text-sm rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-800 rounded-md py-2 px-8"
          >
            {params.slug === "add" ? "Submit" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
