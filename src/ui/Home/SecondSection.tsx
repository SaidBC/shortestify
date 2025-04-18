import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function SecondSection() {
  return (
    <section className="px-2 sm:px-6">
      <h1 className="font-bold text-3xl sm:text-4xl text-center ">
        How to earn money ?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 mt-12">
        <Card className="grid  max-w-md w-full">
          <CardContent className="flex flex-col gap-4 items-center">
            <Image src={"/cursorclick.png"} width={120} height={150} alt="" />
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Earn by sharing links</h2>
              <p className="text-slate-700 text-sm">
                You can earn by sharing your created shorten links
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-4 items-center">
            <Image src={"/uploadicon.png"} width={150} height={150} alt="" />
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Earn by upload files</h2>
              <p className="text-slate-700 text-sm">
                You can earn by sharing your uploaded videos and images and
                files
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-4 items-center">
            <Image src={"/wallet.png"} width={150} height={150} alt="" />

            <div className="text-center flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Withdraw your money</h2>
              <p className="text-slate-700 text-sm">
                You can withdraw your money into your wallet
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
