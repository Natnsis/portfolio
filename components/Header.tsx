import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex py-5 px-10 justify-between">
      <h1>Natnael.</h1>
      <nav className="flex justify-between">
        <Button variant={"outline"}>Work</Button>
        <Button>Credentials</Button>
        <Button>About</Button>
        <Button>Contact</Button>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Header;
