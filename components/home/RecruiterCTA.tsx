import Link from "next/link";

const RecruiterCTA = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold">Available for Full Stack Roles</h2>
          <p className="mt-2 text-emerald-50">
            Focused on scalable product engineering, performance, and clean architecture.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/contact"
            className="px-5 py-3 rounded-lg bg-white text-emerald-700 font-semibold"
          >
            Hire Me
          </Link>
          <a
            href="/resumedk.pdf"
            className="px-5 py-3 rounded-lg border border-white text-white font-semibold"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecruiterCTA;
