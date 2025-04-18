import Image from "next/image";

export default function PaymentMethodsImages() {
  return (
    <div className="flex gap-8 items-center">
      <div>
        <Image
          src="/payeer.png"
          width={150}
          height={50}
          alt="Payeer method image"
        />
      </div>
      <div>
        <Image
          src="/perfectMoney.png"
          width={150}
          height={50}
          alt="Perfect Money method image"
        />
      </div>
      <div>
        <Image
          src="/usdt.png"
          width={150}
          height={50}
          alt="Usdt method image"
        />
      </div>
      <div>
        <Image
          src="/paypal.png"
          width={150}
          height={50}
          alt="Paypal method image"
        />
      </div>
    </div>
  );
}
