/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/common/Button";
import RenderSocial from "@/components/common/RenderSocial";
import SanityImage from "@/components/common/SanityImage";

const TeamSection = ({ data }: { data: any }) => {
  return (
    <section className="py-10 bg-[#F8F6EF]">
      <div className="tp-container">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="mb-8">
            <span className="sub-title ml-12">{data.subheading}</span>
            <h2 className="h1-type mt-5">{data.heading}</h2>
          </div>
          {data?.button?.title && (
            <Button
              title={data?.button?.title}
              btnType={data?.button?.btnType}
              link={data?.button?.link}
              linkType={data?.button?.linkType}
            />
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-10">
          {data?.list?.map((item: any, index: number) => (
            <div
              key={index}
              className={`wow px-7 cursor-pointer relative aspect-square pb-5 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:border-5 hover:before:border-primary before:border-[#8f8f8f0d] before:h-[60%] before:transition-colors before:duration-500  before:z-[0] ${
                index % 2 === 0 ? "fadeInDown" : "fadeInUp"
              }`}
            >
              <div className="mb-4 w-[80%] mx-auto relative z-10">
                <SanityImage
                  image={item.photo}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mt-5 z-10 relative">
                <h3 className="font-extrabold text-xl">{item.name}</h3>
                <p className="text-gray-500">{item?.designation}</p>
                <ul className="flex mx-10 justify-center mt-2 gap-2 border-t-3 border-gray-200 pt-2">
                  {item?.social?.map((social: any, idx: number) => (
                    <li key={idx}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow on social`}
                      >
                        <RenderSocial icon={social.icon} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
