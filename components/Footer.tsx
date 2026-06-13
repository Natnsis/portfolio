"use client";

const Footer = () => {
  return (
    <footer className="py-8 md:py-10 flex items-center justify-between text-xs text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} Natnael Sisay</p>
      <a
        href="mailto:nsisay49@gmail.com"
        className="hover:text-foreground transition-colors"
      >
        nsisay49@gmail.com
      </a>
    </footer>
  );
};

export default Footer;
