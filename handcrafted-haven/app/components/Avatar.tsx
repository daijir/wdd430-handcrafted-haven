import Image from "next/image";

export function Avatar({
  name,
  url,
  size = 128,
}: {
  name: string;
  url?: string;
  size?: number;
}) {
  // If URL exists → show image avatar
  if (url) {
    return (
      <div
        className="rounded-full overflow-hidden border-4 border-indigo-100 shadow"
        style={{
          width: size,
          height: size,
          position: "relative",
        }}
      >
        <Image src={url} alt={name} fill className="object-cover" />
      </div>
    );
  }

  // Otherwise → fallback to initial avatar
  const initial = name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <div
      className="rounded-full bg-indigo-600 border-4 border-indigo-300 shadow flex items-center justify-center text-white font-bold select-none"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.55, 
        lineHeight: 1,         
      }}
    >
      {initial}
    </div>
  );
}
