/* eslint-disable @next/next/no-img-element */
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";

type Props = {
  idGame: string;
  data: DocumentData;
  onDelete: (id: string) => void;
};

export default function Card({ idGame, data, onDelete }: Props) {
  const handleDelete = () => {
    onDelete(idGame);
  };

  return (
    <div className="max-w-xs">
      <img src={data.img} alt="Landscape picture" className="rounded-t-lg" />
      <div className="flex flex-col bg-slate-800 text-lime-50 justify-center items-center p-2 rounded-b-lg gap-2">
        <div className="flex justify-center items-center">
          <h1 className="text-center text-xl font-semibold">
            {data.title} | Score: {data.score}
          </h1>
        </div>
        <hr className="w-full" />
        <div className="flex gap-10 justify-center items-center text-xl">
          <Link href={`description/${idGame}/`}>
            <AiFillEye className="hover:text-slate-400" />
          </Link>
          <button onClick={handleDelete}>
            <BsFillTrash3Fill className="hover:text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
