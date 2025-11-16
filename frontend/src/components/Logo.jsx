export default function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg
        width="38"
        height="38"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Candy Left */}
        <path d="M10 32L4 26L10 20L16 26L10 32Z" fill="#ec4899" />

        {/* Candy Body */}
        <circle cx="32" cy="32" r="17" fill="#f9a8d4" stroke="#db2777" strokeWidth="3" />
        <circle cx="32" cy="32" r="7" fill="white" />

        {/* Candy Right */}
        <path d="M54 32L60 26L54 20L48 26L54 32Z" fill="#ec4899" />
      </svg>

      <span className="text-2xl font-extrabold text-pink-600 tracking-tight">
        SweetX
      </span>
    </div>
  );
}
