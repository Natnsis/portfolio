import { GithubIcon, LinkedinIcon, SendIcon } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <header className="flex justify-between">
      <h1 className="text-2xl font-tertiary">543 <span className="text-sm">Github contributions</span></h1>
      <nav className=" flex gap-3">
        <Button size="icon" variant="ghost">
          <SendIcon />
        </Button>
        <Button size="icon" variant="ghost">
          <GithubIcon />
        </Button>
        <Button size="icon" variant="ghost">
          <LinkedinIcon />
        </Button>
        <ModeToggle />
      </nav>
    </header>
  )
}

export default Header
