import clsx from "clsx";

function GameCard({ children, className }) {
  return (
    <section
      className={clsx(
        "game-shell mx-auto w-full max-w-4xl rounded-3xl border p-5 backdrop-blur-xl sm:p-8",
        className,
      )}
    >
      {children}
    </section>
  );
}

export default GameCard;
