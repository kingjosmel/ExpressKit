// app/docs/[id]/page.jsx
import docsList from "../docsData";

export async function generateStaticParams() {
  return docsList.map((doc) => ({
    id: doc.id,
  }));
}

export default function DocDetailPage({ params }) {
  const doc = docsList.find((d) => d.id === params.id);

  if (!doc) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-slate-300">Topic Not Found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {doc.title}
            </h1>
            <div className="w-16 h-1 bg-sky-400 rounded-full"></div>
          </header>

          {/* Content Grid */}
          <div className="grid gap-8 lg:gap-12">
            {doc.sections.map((section, i) => (
              <article
                key={i}
                className="bg-slate-800/30 rounded-xl p-8 border border-slate-700/50"
              >
                <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-sky-400">
                  {section.heading}
                </h2>

                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-slate-300 leading-relaxed mb-6">
                    {section.body}
                  </p>
                </div>

                {section.code && (
                  <div className="mt-6">
                    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700/50 overflow-x-auto">
                      <pre className="text-sm">
                        <code className="text-slate-50 font-mono leading-relaxed">
                          {section.code}
                        </code>
                      </pre>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Navigation Footer */}
          <footer className="mt-16 pt-8 border-t border-slate-700/50">
            <div className="flex justify-between items-center">
              <div className="text-slate-400">
                <p className="text-sm">ExpressKit Documentation</p>
              </div>
              <div className="text-slate-400">
                <p className="text-sm">
                  Need help? Check out our{" "}
                  <a
                    href="/docs"
                    className="text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    docs overview
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
