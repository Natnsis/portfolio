import { HeartIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full text-center py-6 font-primary text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-2">
        <span>Developed by Orca-dev with</span>
        <HeartIcon size={16} />
        <span>&copy; 2026</span>
      </div>
    </footer>
  );
};

export default Footer;
