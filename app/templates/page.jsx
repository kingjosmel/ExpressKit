// app/templates/page.jsx
import Link from "next/link";
import templatesList from "./templatesList";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Express.js Templates
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              Production-ready code templates and boilerplates to accelerate
              your Express.js development.
            </p>
            <div className="w-16 h-1 bg-sky-400 rounded-full mt-6"></div>
          </header>

          {/* Templates Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templatesList.map((template) => (
              <Link
                key={template.id}
                href={`/templates/${template.id}`}
                className="group block bg-slate-800/30 rounded-lg p-6 border border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-200"
              >
                <article className="h-full">
                  <h2 className="text-xl font-semibold text-sky-400 group-hover:text-sky-300 transition-colors duration-200 mb-3">
                    {template.title}
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {template.description}
                  </p>
                  <div className="mt-auto flex items-center text-slate-400 group-hover:text-slate-300 transition-colors duration-200">
                    <span className="text-sm">View template</span>
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

          {/* Categories Overview */}
          <section className="mt-16 bg-slate-800/20 rounded-xl p-8 border border-slate-700/30">
            <h3 className="text-2xl font-bold mb-6 text-sky-400">
              Template Categories
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-slate-300">
              <div>
                <h4 className="font-semibold text-slate-50 mb-2">
                  Core Templates
                </h4>
                <p className="text-sm leading-relaxed">
                  Essential building blocks including controllers, routes,
                  models, and middleware patterns.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-50 mb-2">
                  Database Templates
                </h4>
                <p className="text-sm leading-relaxed">
                  Database connection patterns, schema definitions, and data
                  access layer templates.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-50 mb-2">
                  Authentication Templates
                </h4>
                <p className="text-sm leading-relaxed">
                  Complete authentication flows including login, registration,
                  and JWT middleware.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-50 mb-2">
                  Advanced Templates
                </h4>
                <p className="text-sm leading-relaxed">
                  Input validation, third-party integrations, and advanced
                  Express.js patterns.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-slate-700/50">
            <div className="text-center text-slate-400">
              <p className="text-sm">
                Need help customizing these templates?{" "}
                <Link
                  href="/docs"
                  className="text-sky-400 hover:text-sky-300 transition-colors"
                >
                  Check our documentation
                </Link>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
