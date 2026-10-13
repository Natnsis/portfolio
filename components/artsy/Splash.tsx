// "Oh, hello!" → "You found me!" speech bubble that greets the first page load.
const BUBBLE =
  "col-start-1 row-start-1 rounded-2xl rounded-tl-none border-2 border-ca-ink bg-ca-yellow px-4 py-3 text-3xl font-medium leading-[1.1] text-ca-ink sm:text-[2.5rem]";

const Chars = ({ text, start }: { text: string; start: number }) =>
  [...text].map((c, i) => (
    <span
      key={i}
      className="ca-splash-char inline-block whitespace-pre"
      style={{ animationDelay: `${(start + i * 0.045).toFixed(3)}s` }}
    >
      {c}
    </span>
  ));

const Splash = () => (
  <div
    aria-hidden
    className="ca-splash ca-grid pointer-events-none fixed inset-0 z-[80] grid place-items-center"
  >
    <span className={`ca-splash-b1 ${BUBBLE}`}>
      <Chars text="Oh, hello!" start={0.15} />
    </span>
    <span className={`ca-splash-b2 ${BUBBLE}`}>
      <Chars text="You found me!" start={0.95} />
    </span>
  </div>
);

export default Splash;
