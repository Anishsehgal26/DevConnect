import { motion } from "framer-motion";
import { Github } from 'lucide-react';
import { ArrowRight,Search, BarChart3 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2563eb22,transparent_60%)]" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
              Developer Portfolio Platform
            </div>

            <h1 className="text-5xl font-bold leading-tight lg:text-6xl">
              Build your
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                {" "}developer identity
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-300">
              Create a modern portfolio, showcase projects, connect GitHub,
              track skills, and get discovered by recruiters.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800"
              >
                Explore Developers
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-8 text-sm text-slate-400">
              <div>
                <p className="text-2xl font-bold text-white">500+</p>
                <p>Developers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">1.2k+</p>
                <p>Projects</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">98%</p>
                <p>Placement Ready</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <Card className="border-slate-800 bg-slate-900/80 shadow-2xl">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">
                    GitHub Portfolio
                  </h3>
                  <Github className="h-6 w-6 text-slate-400" />
                </div>

                <div className="space-y-4">
                  {[
                    "DevConnect",
                    "AI Interview Simulator",
                    "Portfolio Analytics",
                  ].map((repo, index) => (
                    <motion.div
                      key={repo}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-white">
                          {repo}
                        </p>
                        <span className="text-sm text-blue-400">
                          React
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-400">
                        Modern full-stack project with GitHub integration.
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Everything a developer needs
          </h2>
          <p className="mt-4 text-slate-400">
            Showcase your skills, projects, and GitHub profile in one place.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card className="border-slate-800 bg-slate-900 hover:border-blue-500 transition-all">
            <CardContent className="p-6">
              <Github className="h-10 w-10 text-blue-400" />
              <h3 className="mt-4 text-xl font-semibold">
                GitHub Integration
              </h3>
              <p className="mt-2 text-slate-400">
                Automatically fetch repositories and showcase your open-source work.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900 hover:border-violet-500 transition-all">
            <CardContent className="p-6">
              <BarChart3 className="h-10 w-10 text-violet-400" />
              <h3 className="mt-4 text-xl font-semibold">
                Skills Analytics
              </h3>
              <p className="mt-2 text-slate-400">
                Visualize proficiency with interactive charts and technology insights.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900 hover:border-emerald-500 transition-all">
            <CardContent className="p-6">
              <Search className="h-10 w-10 text-emerald-400" />
              <h3 className="mt-4 text-xl font-semibold">
                Developer Discovery
              </h3>
              <p className="mt-2 text-slate-400">
                Search developers by name, skills, bio, and projects.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <p className="text-slate-400">
            © 2026 DevConnect. Built with React, Node.js, PostgreSQL & Tailwind CSS.
          </p>

          <div className="flex items-center gap-6 text-slate-400">
            <a href="#" className="hover:text-white">GitHub</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}