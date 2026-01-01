"use client"
import Experience from "@/components/Experience"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MoveLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { SiExpo, SiExpress, SiMysql, SiNextdotjs, SiNodedotjs, SiPostgresql, SiPrisma, SiReact, SiReactquery, SiSupabase, SiTailwindcss, SiTypescript } from "react-icons/si";

const page = () => {
  const router = useRouter();
  return (
    <section className="p-5">
      <Button onClick={() => router.push('/')}>
        <MoveLeft />
        Go Back
      </Button>
      <main className="mt-10 px-10 grid grid-cols-9 gap-5">
        <Experience />
        <Card className="col-span-3 h-fit">
          <CardHeader>
            <CardTitle>
              <h1 className="text-xl font-primary underline">Tech Stack</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-5">
              <SiReact title="React" size={60} />
              <SiTypescript title="TypeScript" size={60} />
              <SiNodedotjs title="Node.js" size={60} />
              <SiPostgresql title="Postgressql" size={60} />
              <SiTailwindcss title="Tailwindcss" size={60} />
              <SiNextdotjs title="Next.js" size={60} />
              <SiExpress title="Express" size={60} />
              <SiPrisma title="PrismaOrm" size={60} />
              <SiReactquery title="React Query" size={60} />
              <SiSupabase title="Supabase" size={60} />
              <SiMysql title="MySQL" size={80} />
              <SiExpo title="Expo" size={80} />
            </div>
          </CardContent>
        </Card>
      </main>
    </section>
  )
}

export default page
