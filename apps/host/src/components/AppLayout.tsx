import { Heart } from "lucide-react";
import { Header } from "./Header";
import { Outlet } from "react-router";

export default function Layout({
  showBoundary = false,
}: {
  showBoundary?: boolean;
}) {
  return (
    <div
      className={`border flex flex-col h-full  ${
        showBoundary ? "border-white" : "border-transparent"
      }`}
    >
      <div>
        {showBoundary ? (
          <span className="text-white font-bold top-1 left-1 z-10 bg-gradient-to-r from-gray-500 to-black p-1 rounded-lg mt-2 ml-2">
            Host Application
          </span>
        ) : (
          <span className="text-black p-1">t</span>
        )}
        <Header />
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
      <footer className="flex items-center justify-center py-10 min-h-24">
        <a className="flex items-center gap-2 text-white opacity-50">
          <span>Made with </span>
          <Heart className="text-red-500" />
          <span> by Nathan Roark</span>
        </a>
      </footer>
    </div>
  );
}
