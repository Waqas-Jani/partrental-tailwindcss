/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/common/Button";

export default function StepsSection({ data }: any) {
  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-5">
        <div className="mb-12 text-center">
          {data.subheading && (
            <span className="sub-title">{data.subheading}</span>
          )}
          <h2 className="h1-type">{data.heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-8">
          {/* Step 1 */}
          {data.steps.map((step: any, index: number) => (
            <div className="relative" key={index}>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold z-10">
                {step.step}
              </div>
              <div className="bg-black pt-12 px-10 pb-10 h-full flex items-center justify-center shadow-md">
                <h6 className="text-white text-xl font-extrabold text-center italic mb-4">
                  {step.heading}
                </h6>
                <p className="text-white text-center font-medium italic mt-4">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 flex-wrap justify-center qZmt-8">
          {data?.button?.title && (
            <Button
              title={data.button.title}
              btnType={data?.button.btnType}
              link={data?.button.link}
              linkType={data?.button.linkType}
            />
          )}
          {data?.button2?.title && (
            <Button
              title={data.button2.title}
              btnType={data?.button2.btnType}
              link={data?.button2.link}
              linkType={data?.button2.linkType}
            />
          )}
        </div>
      </div>
    </section>
  );
}
