import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Featured Card */}
        <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Gait Daily
          </h1>
          <p className="text-white/70 text-lg mb-6">
            A beautiful application inspired by Luma, with smooth animations and modern design.
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors duration-200">
            Get Started
          </button>
        </div>

        {/* Feature Cards */}
        {[
          {
            title: "Lightning Fast",
            description: "Built with Next.js for optimal performance",
            icon: "⚡",
          },
          {
            title: "Beautiful Animations",
            description: "Smooth transitions powered by Framer Motion",
            icon: "✨",
          },
          {
            title: "Dark Theme",
            description: "Easy on the eyes with a modern dark interface",
            icon: "🌙",
          },
          {
            title: "Responsive Design",
            description: "Works perfectly on all devices and screen sizes",
            icon: "📱",
          },
          {
            title: "Database Ready",
            description: "SQLite with Prisma ORM for data persistence",
            icon: "💾",
          },
          {
            title: "Vercel Deployed",
            description: "One-click deployment to production",
            icon: "🚀",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
          >
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-white/60 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
        <ul className="space-y-3 text-white/70">
          <li className="flex items-start">
            <span className="text-green-400 mr-3">✓</span>
            <span>Edit <code className="bg-white/10 px-2 py-1 rounded">app/page.tsx</code> to customize the landing page</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-3">✓</span>
            <span>Add menu items in <code className="bg-white/10 px-2 py-1 rounded">app/components/SlideUpMenu.tsx</code></span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-3">✓</span>
            <span>Update the splash icon in <code className="bg-white/10 px-2 py-1 rounded">app/components/SplashScreen.tsx</code></span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-3">✓</span>
            <span>Configure your database schema in <code className="bg-white/10 px-2 py-1 rounded">prisma/schema.prisma</code></span>
          </li>
        </ul>
      </div>
    </div>
  );
}
