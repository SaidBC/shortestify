import Logo from "@/components/Logo";
import PaymentMethodsImages from "@/components/PaymentMethodsImages";

export default function Footer() {
  return (
    <footer className="bg-indigo-950 text-white p-6 flex flex-col gap-4">
      <div className="flex gap-4 justify-between items-center">
        <Logo />
        <span>Copyright 2025 All Rights Reserved.</span>
      </div>
      <div className="self-center">
        <PaymentMethodsImages />
      </div>
    </footer>
  );
}
