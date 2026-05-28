import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  const routes = [
    {
      name:"Home",
      path:"#home"
    },
    {
      name:"Projects",
      path:"#projects"
    },
    {
      name:"About",
      path:"#about"
    },
    {
      name:"Contact",
      path:"#contact"
    }
  ]
  return (
    <header className="flex justify-between p-5">
      <h1 className="text-xl">Full Stack - Software Developer</h1>
      <div className="flex gap-10">
        {routes.map((r,index)=>(
          <Link key={index} href={r.path} className="text-lg">{r.name}</Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
