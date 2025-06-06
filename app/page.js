import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              The <span className="text-sky-400">Express.js</span> Toolkit
              <br />
              for Developers
            </h1>
            <p className="text-xl lg:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Learn Express.js the right way. Clean docs, real-world templates,
              and easy-to-copy examples.
            </p>
            <Link
              href="/docs"
              className="inline-block bg-sky-400 text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-sky-300 transition-colors duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Why Express */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Why Express?
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed text-center max-w-3xl mx-auto">
              Express.js is the most popular web framework for Node.js, powering
              millions of applications worldwide. It's fast, unopinionated, and
              provides a robust set of features for building web and mobile
              applications. With its minimalist approach, Express gives you the
              freedom to structure your application however you want.
            </p>

            <div className="bg-slate-800 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm">
                <code className="text-slate-50 font-mono">
                  {`const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}\`)
})`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Under the Hood */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Under the Hood
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed text-center max-w-3xl mx-auto">
              Express is a minimal and flexible Node.js web application
              framework that provides a robust set of features for web and
              mobile applications. Built on top of Node.js's HTTP module, it
              simplifies server creation while maintaining the power and
              flexibility you need for complex applications.
            </p>

            <div className="bg-slate-800 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm">
                <code className="text-slate-50 font-mono">
                  {`const express = require('express')
const app = express()

// Middleware for parsing JSON
app.use(express.json())

// Custom middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path} - \${Date.now()}\`)
  next()
})

// Route handlers
app.get('/api/users', (req, res) => {
  res.json({ users: ['Alice', 'Bob', 'Charlie'] })
})

app.post('/api/users', (req, res) => {
  const { name } = req.body
  res.json({ message: \`User \${name} created\` })
})

app.listen(3000)`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Express vs Other Frameworks */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Express vs Other Frameworks
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Express */}
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4 text-sky-400">
                  Express.js
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Minimal and unopinionated
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Huge ecosystem & community
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Flexible architecture
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Easy to learn
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Extensive middleware support
                  </li>
                </ul>
              </div>

              {/* NestJS */}
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4 text-orange-400">
                  NestJS
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    TypeScript-first approach
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Opinionated structure
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Built-in dependency injection
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">×</span>
                    Steeper learning curve
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">×</span>
                    More complex for simple apps
                  </li>
                </ul>
              </div>

              {/* Fastify */}
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">
                  Fastify
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    High performance
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    Built-in JSON schema validation
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    TypeScript support
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">×</span>
                    Smaller ecosystem
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">×</span>
                    Less community resources
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Install */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">How to Install</h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Getting started with Express.js is simple. Just install it via npm
              and you're ready to build your first web application.
            </p>

            <div className="bg-slate-800 rounded-lg p-6 overflow-x-auto max-w-2xl mx-auto">
              <pre className="text-sm">
                <code className="text-slate-50 font-mono">
                  {`# Create a new project
mkdir my-express-app
cd my-express-app

# Initialize npm
npm init -y

# Install Express
npm install express

# Create your first server
echo "const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello Express!')
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})" > app.js

# Run your server
node app.js`}
                </code>
              </pre>
            </div>

            <div className="mt-12">
              <Link
                href="/docs"
                className="inline-block bg-sky-400 text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-sky-300 transition-colors duration-200"
              >
                Start Building →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
