import { Github } from "lucide-react";
import { Link } from "react-router";
// import { useLocalStorage } from "../useLocalStorage";

export function Header() {
  return (
    <header className="w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          <Link to="/">
            <img
              src="https://cdn.prod.website-files.com/669061ee3adb95b628c3acda/66acd2a968324f3e610c1cae_zephyr%20logo.svg"
              alt="Zephyr Cloud"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="https://github.com/nathanroark/zephyr-app"
              className="inline-flex items-center hover:text-white transition-colors"
            >
              <Github className="h-5 w-5 mr-1" />
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
