// app/docs/page.jsx
import Link from "next/link";
import docsList from "./docsData";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Express.js Documentation
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              Comprehensive guides and references to help you master Express.js
              development.
            </p>
            <div className="w-16 h-1 bg-sky-400 rounded-full mt-6"></div>
          </header>

          {/* Documentation Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {docsList.map((doc) => (
              <Link
                key={doc.id}
                href={`/docs/${doc.id}`}
                className="group block bg-slate-800/30 rounded-lg p-6 border border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-200"
              >
                <article className="h-full">
                  <h2 className="text-xl font-semibold text-sky-400 group-hover:text-sky-300 transition-colors duration-200 mb-3">
                    {doc.title}
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Learn about {doc.title.toLowerCase()} in Express.js
                  </p>
                  <div className="mt-4 flex items-center text-slate-400 group-hover:text-slate-300 transition-colors duration-200">
                    <span className="text-sm">Read more</span>
                    <svg
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-slate-700/50">
            <div className="text-center text-slate-400">
              <p className="text-sm">
                Can't find what you're looking for?{" "}
                <Link
                  href="/"
                  className="text-sky-400 hover:text-sky-300 transition-colors"
                >
                  Back to home
                </Link>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
