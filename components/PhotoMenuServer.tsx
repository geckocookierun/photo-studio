import { cn } from "@/lib/utils";
import Link from "next/link";

// Define a reusable type for photo types
type PhotoType = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

interface PhotoMenuServerProps {
  photoTypes: PhotoType[];
  activeType: string;
  dict: { [key: string]: any };
  path: string;
}

export function PhotoMenuServer({
  photoTypes,
  activeType,
  dict,
  path,
}: PhotoMenuServerProps) {
  return (
    <ul role="menu" aria-label={dict.id_photos.category}>
      {photoTypes.map((type) => (
        <li key={type.id} role="menuitem">
          <Link
            href={`/${path}/${type.id}`}
            aria-current={activeType === type.id ? "page" : undefined}
            title={`View ${type.label.toLowerCase()} photos`}
            className={cn(
              "flex items-center px-4 py-3 rounded-lg text-sm font-medium",
              "transition-all duration-200 ease-in-out",
              activeType === type.id
                ? "bg-gray-300 text-gray-900 shadow-md"
                : "text-gray-700 hover:bg-gray-200 hover:shadow"
            )}
          >
            <span className="sr-only">Select </span>
            {type.icon}
            <span className="ml-3 text-xs md:text-base">{type.label}</span>
            {activeType === type.id && (
              <span className="ml-auto w-2 h-2 bg-gray-500 rounded-full" aria-hidden="true" />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
