// app/docs/[id]/page.jsx
import docsList from "../docsData";

export async function generateStaticParams() {
  return docsList.map((doc) => ({ id: doc.id }));
}

export default function DocDetailPage({ params }) {
  const doc = docsList.find((d) => d.id === params.id);

  if (!doc) return <div className="p-6">404 | Topic Not Found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{doc.title}</h1>
      {doc.sections.map((section, i) => (
        <div key={i} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>
          <p className="mb-2 text-gray-700">{section.body}</p>
          {section.code && (
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-auto">
              <code>{section.code}</code>
            </pre>
          )}
        </div>
      ))}
    </div>
  );
}
