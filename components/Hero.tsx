import { Button } from "@/components/ui/button"
import { BookIcon, DownloadIcon, MailIcon } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card"

const Hero = () => {
  return (
    <div className="flex gap-10 py-5">
      <div className="p-15 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-5xl mb-2"> Hi, I'm Natnael Sisay 👋</h1>
            <p className="text-sm text-gray-500">Full-Stack Developer</p>
          </div>
          <p className="font-primary">Am a developer passionate about my field and obsesseed with learning</p>
        </div>
        <div className="flex gap-5">
          <Button className="flex gap-2 items-center" variant="outline">
            <DownloadIcon /> Downlaod CV
          </Button>
          <Button className="flex gap-2 items-center" variant="outline">
            <BookIcon />
            Experience & Skills
          </Button>
          <Button className="flex gap-2 items-center" variant="outline">
            <MailIcon />
            Contact Me
          </Button>
        </div>
      </div>
      <div className="p-15 flex flex-col gap-10 w-[40vw]">
        <Card className="w-full p-5">
          <CardHeader>
            <CardTitle>
              <h1 className="font-secondary">About Me</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>My journey into web and mobile development began with curiosity and has evolved into a passion for building digital tools that solve real problems especially in student and local community spaces. I enjoy creating apps that blend functionality with clean design, while continuously learning and improving my skills.</CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Hero
