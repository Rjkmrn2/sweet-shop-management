export default function Home() {
return (
<main className="flex flex-col items-center justify-center text-center px-6 py-20">
<h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
Engineering Beautiful, Modern
<span className="text-blue-600"> Full‑Stack Solutions</span>
</h1>


<p className="text-gray-600 max-w-2xl text-lg mt-6 mb-10">
A professionally crafted demo application showcasing React, Tailwind, Node.js,
Express, and MongoDB — designed to highlight clean architecture and strong development skills.
</p>


<a href="/projects" className="px-8 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 text-lg">
View Projects
</a>
</main>
);
}