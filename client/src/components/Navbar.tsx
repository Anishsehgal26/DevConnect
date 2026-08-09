import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Code2, Github, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600 p-2">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">DevConnect</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-slate-300 hover:text-white transition">
            Home
          </Link>
          <Link
            to="/developers"
            className="text-slate-300 hover:text-white transition"
          >
            Explore
          </Link>
          <Link
            to="/dashboard"
            className="text-slate-300 hover:text-white transition"
          >
            Dashboard
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-slate-300 hover:text-white transition"
          >
            <Github className="h-5 w-5" />
          </a>
        </nav>

        <div className="hidden md:block">
          <Button
            className="rounded-xl bg-blue-600 hover:bg-blue-700"
            onClick={() => window.location.href = "/login"}
          >
            Get Started
          </Button>

        </div>

        <Sheet>
          <SheetTrigger>
            <Menu className="h-6 w-6 text-white" />
          </SheetTrigger>

          <SheetContent side="right" className="border-slate-800 bg-slate-950">
            <div className="mt-8 flex flex-col gap-6">
              <Link to="/" className="text-lg text-white">
                Home
              </Link>
              <Link to="/developers" className="text-lg text-white">
                Explore
              </Link>
              <Link to="/dashboard" className="text-lg text-white">
                Dashboard
              </Link>

              <Link to="/login">
                <Button className="mt-4 w-full bg-blue-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}