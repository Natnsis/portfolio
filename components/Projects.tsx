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
import { Badge } from "@/components/ui/badge"
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
  const [type, setType] = useState<number>(1)
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})

  const getVariant = (btnType: number): Variant =>
    type === btnType ? "default" : "outline"

  const dataMap = {
    1: websites,
    2: apps,
    3: bots,
    4: tools,
  }

  const projects = dataMap[type] ?? []

  const toggleReadMore = (index: number) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-10 items-start">
        {projects.map((p, index) => {
          const isExpanded = expanded[index]

          return (
            <Card key={index} className="w-full flex flex-col">
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

              <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
                {/* Description */}
                <p className={isExpanded ? "" : "line-clamp-3"}>
                  {p.description}
                </p>

                <button
                  onClick={() => toggleReadMore(index)}
                  className="text-xs text-primary w-fit hover:underline"
                >
                  {isExpanded ? "Read less" : "Read more"}
                </button>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {p.tags.map((t, i) => (
                    <Badge key={i} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex gap-4 mt-auto">
                <Button size="sm" variant="outline" asChild>
                  <a href={p.source} className="flex gap-2">
                    <ExternalLink size={16} />
                    Source
                  </a>
                </Button>
                {p.isLive &&
                  <Button size="sm" asChild>
                    <a href={p.live} className="flex gap-2">
                      <LinkIcon size={16} />
                      Live
                    </a>
                  </Button>
                }
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

export default Projects
