import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex justify-between">
      <h6 className="text-2xl">Natnael.s</h6>
      <nav>
        <Button>Work</Button>
        <Button>Credential</Button>
        <Button>About</Button>
        <Button>Contact</Button>
      </nav>
    </header>
  );
};

export default Header;
