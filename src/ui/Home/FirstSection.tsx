import SimpleShortForm from "./SimpleShortForm";

export default function FirstSection() {
  return (
    <section className="flex justify-center px-2 sm:px-4 pt-18">
      <div className="flex flex-col gap-8 pt-32">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Shorten, Share & Earn Money
          </h1>
          <p className="sm:text-lg">
            Shorten, share and track every link with shortestify, the best URL
            shortener in the world.
          </p>
        </div>
        <SimpleShortForm />
      </div>
    </section>
  );
}
