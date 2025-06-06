// app/templates/[id]/page.jsx
import templatesList from "../templatesList";

export async function generateStaticParams() {
  return templatesList.map((template) => ({
    id: template.id,
  }));
}

export default function TemplateDetailPage({ params }) {
  const template = templatesList.find((t) => t.id === params.id);

  if (!template) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-slate-300">Template Not Found</p>
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
              {template.title}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
              {template.description}
            </p>
            <div className="w-16 h-1 bg-sky-400 rounded-full mt-6"></div>
          </header>

          {/* Template Content Grid */}
          <div className="grid gap-8 lg:gap-12">
            {template.sections.map((section, i) => (
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

                {section.filename && (
                  <div className="mt-4">
                    <span className="inline-block bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm font-mono">
                      {section.filename}
                    </span>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Usage Notes */}
          {template.usage && (
            <div className="mt-12 bg-slate-800/20 rounded-xl p-8 border border-slate-700/30">
              <h3 className="text-xl font-bold mb-4 text-sky-400">
                Usage Notes
              </h3>
              <p className="text-slate-300 leading-relaxed">{template.usage}</p>
            </div>
          )}

          {/* Navigation Footer */}
          <footer className="mt-16 pt-8 border-t border-slate-700/50">
            <div className="flex justify-between items-center">
              <div className="text-slate-400">
                <p className="text-sm">ExpressKit Templates</p>
              </div>
              <div className="text-slate-400">
                <p className="text-sm">
                  Browse more{" "}
                  <a
                    href="/templates"
                    className="text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    templates
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
