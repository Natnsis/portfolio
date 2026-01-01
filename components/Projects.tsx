"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Bot,
  ExternalLink,
  Link as LinkIcon,
  MonitorIcon,
  Smartphone,
  ToolboxIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Separator } from "./ui/separator"
import { apps, bots, tools, websites } from "@/constants/projects"

type Variant = "default" | "outline" | "link"

const Projects = () => {
  const [type, setType] = useState<number>(2)

  const getVariant = (btnType: number): Variant =>
    type === btnType ? "default" : "outline"

  const dataMap = {
    1: websites,
    2: apps,
    3: bots,
    4: tools,
  }

  const projects = dataMap[type] ?? []

  return (
    <section className="p-15 flex flex-col gap-5">
      <h1 className="text-lg font-secondary">Projects</h1>

      {/* Filters */}
      <div className="flex gap-5 flex-wrap">
        <Button
          variant={getVariant(1)}
          onClick={() => setType(1)}
          className="flex gap-2 items-center"
        >
          <MonitorIcon />
          Web App
        </Button>

        <Button
          variant={getVariant(2)}
          onClick={() => setType(2)}
          className="flex gap-2 items-center"
        >
          <Smartphone />
          Mobile App
        </Button>

        <Button
          variant={getVariant(3)}
          onClick={() => setType(3)}
          className="flex gap-2 items-center"
        >
          <Bot />
          Bot APIs
        </Button>

        <Button
          variant={getVariant(4)}
          onClick={() => setType(4)}
          className="flex gap-2 items-center"
        >
          <ToolboxIcon />
          Tools & Configs
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p, index) => (
          <Card key={index} className="w-full">
            <Image
              src={p.image}
              alt={p.title}
              width={300}
              height={200}
              className="w-full rounded-t-md object-cover"
            />

            <CardHeader>
              <CardTitle className="font-primary text-base">
                {p.title}
              </CardTitle>
              <Separator />
            </CardHeader>

            <CardContent className="text-sm text-muted-foreground line-clamp-3">
              {p.description}
            </CardContent>

            <CardFooter className="flex gap-4">
              <Button size="sm" variant="outline" className="flex gap-2">
                <ExternalLink size={16} />
                Source
              </Button>

              <Button size="sm" className="flex gap-2">
                <LinkIcon size={16} />
                Live
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Projects
