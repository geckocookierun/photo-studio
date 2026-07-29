"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { PhotoMenuServer } from "./PhotoMenuServer";

interface PhotoType {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface PhotoMenuProps {
  photoTypes: PhotoType[];
  activeType: string;
  dict: { [key: string]: any };
  lang: string;
}

export function PhotoMenu({ photoTypes, activeType, dict, lang }: PhotoMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/").at(-2) || ""; // Gets the last segment of the path

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>, typeId: string) => {
      e.preventDefault();
      router.push(`?type=${typeId}`, { scroll: false });
      setIsExpanded(false);
    },
    [router]
  );

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link) {
        const typeId = new URLSearchParams(link.search).get("type");
        if (typeId) handleClick(e, typeId);
      }
    },
    [handleClick]
  );

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div className="sticky top-2 z-40">
      <div className="md:sticky md:top-2  md:z-40  bg-gradient-to-b from-gray-50 to-gray-100 p-2 rounded-lg shadow-sm">
        <button
          className="flex justify-between items-center w-full lg:w-72 lg:mb-4"
          onClick={toggleExpand}
          aria-expanded={isExpanded}
          aria-controls="photo-menu-nav"
        >
          <h3 className="text-base md:text-xl  font-semibold text-gray-800">
            {dict.id_photos.category}
          </h3>
          <span className="md:hidden">
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </span>
        </button>

        <nav
          id="photo-menu-nav"
          className={cn(
            "space-y-2 transition-all duration-300 ease-in-out",
            "visible md:block",
            {
              "h-auto opacity-100": isExpanded,
              "h-0 opacity-0 invisible md:visible md:h-auto md:opacity-100": !isExpanded,
            },
            "overflow-hidden"
          )}
          onClick={handleNavClick}
        >
          <PhotoMenuServer
            photoTypes={photoTypes}
            activeType={activeType}
            dict={dict}
            path={path}
          />
        </nav>
      </div>
    </div>
  );
}
