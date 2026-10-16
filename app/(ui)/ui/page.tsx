import { Contact, Credentials, Intro, Toolkit, TopBar } from "@/components/site/Sections";
import Shelf from "@/components/site/Shelf";

const page = () => (
  <>
    <TopBar />
    <main>
      <Intro />
      <section id="work" className="mx-auto max-w-5xl px-3 sm:px-5">
        <div className="mx-auto mb-2 max-w-3xl px-2">
          <h2 className="font-serif text-3xl">The shelf</h2>
          <p className="mt-1 text-[15px] text-dk-mute">Everything I&apos;ve built, one book each. Pull one out to read it.</p>
        </div>
        <Shelf />
      </section>
      <Toolkit />
      <Credentials />
    </main>
    <Contact />
  </>
);

export default page;
