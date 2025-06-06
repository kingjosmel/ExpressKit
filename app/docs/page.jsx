// app/docs/page.jsx
import Link from "next/link";
import docsList from "./docsData";

export default function DocsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Express.js Documentation</h1>
      <ul className="space-y-3">
        {docsList.map((doc) => (
          <li key={doc.id}>
            <Link
              href={`/docs/${doc.id}`}
              className="text-blue-600 hover:underline"
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
