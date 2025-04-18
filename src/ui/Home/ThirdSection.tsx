import FaqComponent from "@/components/FaqComponent";

export default function ThirdSection() {
  return (
    <section className="my-20 px-2 sm:px-6">
      <h1 className="font-bold text-3xl sm:text-4xl text-center">
        Questions? We’ve got answers.
      </h1>
      <div className="mt-12">
        <FaqComponent title="What products does OKX provide?">
          OKX is an innovative cryptocurrency exchange with advanced financial
          offerings. We offer cutting-edge crypto trading and earning services
          to millions of users globally in more than 180 regions.
        </FaqComponent>
        <FaqComponent title="What products does OKX provide?">
          OKX is an innovative cryptocurrency exchange with advanced financial
          offerings. We offer cutting-edge crypto trading and earning services
          to millions of users globally in more than 180 regions.
        </FaqComponent>
        <FaqComponent title="What products does OKX provide?">
          OKX is an innovative cryptocurrency exchange with advanced financial
          offerings. We offer cutting-edge crypto trading and earning services
          to millions of users globally in more than 180 regions.
        </FaqComponent>
      </div>
    </section>
  );
}
