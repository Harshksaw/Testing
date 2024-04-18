import Image from "next/image";
import Reports from "./components/Reports";

export default function Home() {
  return (
      <main className="w-full h-full">
        <header className="bg-black p-5 text-blue-500 animate-fade-in">
          <h1 className="text-center text-6xl font-extrabold animate-pulse">Pagination Assignment</h1>
        </header>

        <Reports/>
      </main>
  );
}
