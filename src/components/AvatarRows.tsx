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
  // Divide avatars into n rows (demo: 5 per row)
  const rows: User[][] = [];
  for (let i = 0; i < audience.length; i += 5) {
    rows.push(audience.slice(i, i + 5));
  }

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-3 px-2">
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex flex-row gap-4 w-full justify-start mb-2"
        >
          {row.map((user, j) => (
            <div
              key={user.name}
              className="bg-zinc-900 rounded-xl px-2 py-1 flex items-center gap-2 min-w-[98px] border border-zinc-800"
            >
              <Avatar size="sm" name={user.name} src={user.avatarUrl} muted />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
