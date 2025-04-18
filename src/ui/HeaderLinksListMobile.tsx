import Link from "next/link";

export default function HeaderLinksListMobile() {
  return (
    <div className="flex flex-col gap-8 text-xl">
      <ul className="flex flex-col gap-4">
        <li>
          <Link href="/" className="hover:text-white/80">
            Home
          </Link>
        </li>
        <li>
          <Link href="/payments" className="hover:text-white/80">
            Payment Proof
          </Link>
        </li>
        <li>
          <Link href="/rates" className="hover:text-white/80">
            Rates
          </Link>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <div>
          <Link
            href="/auth/login"
            className="hover:text-white/80 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-gray-900 py-2 px-4"
          >
            Login
          </Link>
        </div>
        <span className="text-base">OR</span>
        <div>
          <Link
            href="/auth/signup"
            className="hover:text-white/80 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-gray-900 py-2 px-4"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
