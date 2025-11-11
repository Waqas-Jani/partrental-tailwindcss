/* eslint-disable @typescript-eslint/no-explicit-any */
import OrgariumCounter from "@/components/common/OrgariumCounter";

const Statistics = ({ data }: { data: any }) => {
  return (
    <section
      className="relative py-20  overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #fef2f2 100%)",
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        ></div>
      </div>

      <div className="tp-container">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-block relative">
            <h2
              className="text-6xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black leading-none tracking-wider text-transparent bg-clip-text inline-block"
              style={{
                backgroundImage: data.textBg?.asset?.url
                  ? `url(${data.textBg.asset?.url})`
                  : "linear-gradient(135deg, #ec2026 0%, #dc2626 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "inline-block", // ensures background clips correctly
              }}
            >
              {data.heading}
            </h2>

            {/* Decorative underline */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-primary to-red-600 rounded-full"></div>
          </div>
        </div>

        {/* Counter Section */}
        <div className="relative">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-12">
            <div className="relative z-10">
              <OrgariumCounter data={data.list} />
            </div>

            {/* Floating elements for decoration */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-red-400 rounded-full opacity-40 animate-bounce"></div>
            <div className="absolute top-1/2 -right-8 w-6 h-6 bg-red-500 rounded-full opacity-50 animate-ping"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
