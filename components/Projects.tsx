import { Button } from "@/components/ui/button"
import { Bot, MonitorIcon, Smartphone, ToolboxIcon } from "lucide-react"

const Projects = () => {
  return (
    <section className="p-15 flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-secondary">Projects</h1>
      </div>
      <div className="flex gap-5">
        <Button className="flex gap-2 items-center"><MonitorIcon /> Web App</Button>
        <Button className="flex gap-2 items-center"><Smartphone />Mobile App</Button>
        <Button className="flex gap-2 items-center"><Bot /> Bot Apis</Button>
        <Button className="flex gap-2 items-center"><ToolboxIcon /> Tools & Configs</Button>
      </div>
    </section>
  )
}

export default Projects
