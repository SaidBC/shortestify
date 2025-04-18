import FirstSection from "@/ui/Home/FirstSection";
import SecondSection from "@/ui/Home/SecondSection";
import ThirdSection from "@/ui/Home/ThirdSection";

export default function Page() {
  return (
    <main className="bg-indigo-500  text-white flex flex-col ">
      <div className="fixed w-full z-0">
        <FirstSection />
      </div>
      <div className="z-20 bg-[linear-gradient(176deg,_rgba(0,0,0,0)_20dvh,_rgba(0,0,0,0.2)_20dvh,#f8fafc_20dvh)] min-h-dvh w-full mt-124 pt-[30dvh] text-slate-950">
        <SecondSection />
        <ThirdSection />
      </div>
    </main>
  );
}
