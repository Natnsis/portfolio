import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex py-5 px-10 justify-between">
      <h1>Natnael.</h1>
      <nav>
        <Button variant={"link"}>Work</Button>
        <Button variant={"link"}>Credentials</Button>
        <Button variant={"link"}>About</Button>
        <Button variant={"link"}>Contact</Button>
      </nav>
    </header>
  );
};

export default Header;
