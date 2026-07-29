import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ValidLocale } from "@/lib/i18n/config";
import { cloudinaryFolders, CloudinaryImageType, getImagesFromFolder } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { CloudinaryImage } from "./CloudinaryImage";
import { Button } from "./ui/button";

interface MobileNavProps {
  lang: ValidLocale;
  dict: any;
  navItems: Array<{ href: string; label: string }>;
}

export async function MobileNav({ lang, dict, navItems }: MobileNavProps) {
  const serviceCoverPhoto = await getImagesFromFolder(cloudinaryFolders.serviceCoverPhoto);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden" size="icon">
          <Menu />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">
            <CloudinaryImage
              src={
                serviceCoverPhoto.find((image: CloudinaryImageType) => image.title === "logo")?.url
              }
              alt={
                serviceCoverPhoto.find((image: CloudinaryImageType) => image.title === "logo")
                  ?.title
              }
              width={150}
              height={50}
              quality={75}
              sizes="150px"
              className=" transition-transform duration-300 rounded-lg"
            />
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-6">
          {navItems.map((item, index) => (
            <SheetClose asChild key={index}>
              <Link
                href={item.href}
                className="text-lg font-medium hover:text-rose-500 transition-colors"
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
