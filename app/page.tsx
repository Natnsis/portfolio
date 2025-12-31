import Github from "@/components/Github"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Projects from "@/components/Projects"
import { Separator } from "@/components/ui/separator"

const page = () => {
  return (
    <main className="p-10">
      <Header />
      <Hero />
      <Github />
      <Separator />
      <Projects />
    </main>
  )
}

export default page
