
import Avatar from "./Avatar";

interface User {
  name: string;
  avatarUrl: string;
}

interface AvatarRowsProps {
  audience: User[];
}

/**
 * Arranges a grid of avatars in offset 'theater' rows.
 */
export default function AvatarRows({ audience }: AvatarRowsProps) {
  // Divide avatars into n rows (~5 per row for demo)
  const rows: User[][] = [];
  for (let i = 0; i < audience.length; i += 5) {
    rows.push(audience.slice(i, i + 5));
  }

  return (
    <div className="w-full flex flex-col items-center gap-2 mt-2">
      {rows.map((row, i) => (
        <div
          key={i}
          className={`flex flex-row justify-center gap-6
            ${i % 2 === 1 ? "ml-12" : ""}
          `}
        >
          {row.map((user, j) => (
            <Avatar key={user.name} size="md" name={user.name} src={user.avatarUrl} muted />
          ))}
        </div>
      ))}
    </div>
  );
}
