import { EMAIL } from "@/lib/site";
import Footer from "./Footer";
import { ArrowDisc } from "./icons";

const Contact = () => (
  <section
    id="contact"
    className="flex flex-col bg-navy pb-12 text-white gutter-x"
    style={{ paddingTop: "clamp(100px,14vw,200px)", gap: "clamp(80px,10vw,140px)" }}
  >
    <div className="flex justify-end">
      <div className="max-w-[720px]">
        <p className="mb-4 text-lg tracking-[.025em] text-white/60">Contact</p>
        <h2 className="mb-6 mt-0 display" style={{ fontSize: "clamp(2rem,4vw,4rem)" }}>
          Let&apos;s build
          <br />
          something together.
        </h2>
        <p className="mb-10 mt-0 max-w-[46ch] text-base font-light leading-[1.65] text-white/75">
          Whether you have a project in mind or just want to say hi, I&apos;m always open to
          a conversation.
        </p>
        <a href={`mailto:${EMAIL}`} className="group inline-flex items-center gap-4">
          <span className="text-sm uppercase tracking-[.3em] text-white/80 break-all">
            {EMAIL}
          </span>
          <ArrowDisc />
        </a>
      </div>
    </div>
    <Footer />
  </section>
);

export default Contact;
