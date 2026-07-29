import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Edit, Phone, Ruler, Wand2 } from "lucide-react";
import { CloudinaryImage } from "./CloudinaryImage";

interface ServiceCardProps {
  icon: "edit" | "cloud" | "ruler" | "wand";
  title: string;
  description?: string;
  url?: string;
}

export default function ServiceCard({ icon, title, description, url }: ServiceCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "edit":
        return <Edit className="h-6 w-6 text-rose-500" />;
      case "cloud":
        return <Cloud className="h-6 w-6 text-rose-500" />;
      case "ruler":
        return <Ruler className="h-6 w-6 text-rose-500" />;
      case "wand":
        return <Wand2 className="h-6 w-6 text-rose-500" />;
      default:
        return <Edit className="h-6 w-6 text-rose-500" />;
    }
  };

  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4 shrink-0">
          {getIcon()}
        </div>
        <h3 className="text-lg font-semibold mb-2 leading-snug">{title}</h3>
        {description ? (
          <p className="text-gray-600 text-sm leading-relaxed flex-1">{description}</p>
        ) : (
          <div className="flex-1" />
        )}
        {url ? (
          <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col items-start gap-3">
            <div className="flex items-center space-x-2">
              <Phone className="text-rose-500 flex-shrink-0 h-4 w-4" />
              <a href="tel:0909939351" className="text-sm hover:text-blue-300 transition-colors">
                0909939351
              </a>
            </div>
            <CloudinaryImage
              src={url}
              alt={title}
              width={96}
              height={96}
              quality={60}
              sizes="96px"
              className="rounded-md"
            />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
