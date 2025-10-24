"use client";
import React, { useState, useEffect, useRef } from "react";
import Button from "@/components/common/Button";
import { useFormSubmission } from "@/hooks/useFormSubmission";

interface ContactProps {
  data: {
    homeForm: {
      subheading: string;
      heading: string;
      button: {
        title: string;
        btnType: string;
        link: string;
        linkType: string;
      };
    };
    mapUrl: string;
  };
  isHome?: boolean;
}

const Contact: React.FC<ContactProps> = ({ data, isHome = false }) => {
  const { homeForm } = data;
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Use the reusable form submission hook
  const {
    register,
    registerWithTracking,
    handleSubmit,
    errors,
    isSubmitSuccessful,
    submitCompletedForm,
  } = useFormSubmission({
    endpoint: "https://leads.civsav.com/template/contact",
    completedSheetId: 85,
    abandonedSheetId: 89,
    formType: "home_contact_form",
    trackingFields: ["name", "email", "message"],
  });

  // Intersection Observer to detect when map container is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadMap) {
            // Add a delay before loading the map
            setTimeout(() => {
              setShouldLoadMap(true);
            }, 2000); // 2 second delay
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "50px", // Start loading 50px before the element comes into view
      }
    );

    const currentRef = mapContainerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [shouldLoadMap]);

  return (
    <section
      className="contact-section pt-10 md:pt-[130] pb-10 md:pb-[80px]"
      style={{
        backgroundColor: "#f8f6ef",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
          <div className="md:col-span-5">
            <div className="text-center md:text-left">
              <span className="sub-title md:ml-12">{homeForm.subheading}</span>
              <h2 className="h1-type mt-5">{homeForm.heading}</h2>
            </div>
            <div className="mt-12">
              <form onSubmit={handleSubmit(submitCompletedForm)}>
                <div>
                  <input
                    type="text"
                    className="input-field-primary"
                    placeholder="Full Name"
                    {...registerWithTracking("name", {
                      required: "Name is required",
                    })}
                  />
                  {errors?.name && (
                    <span className="text-red-500 text-sm">
                      {String(errors.name?.message)}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    className="input-field-primary"
                    placeholder="Email Address"
                    {...registerWithTracking("email", {
                      required: "Email is required",
                    })}
                  />
                  {errors?.email && (
                    <span className="text-red-500 text-sm">
                      {String(errors.email?.message)}
                    </span>
                  )}
                </div>
                <div>
                  <textarea
                    className="input-field-primary"
                    placeholder="Write Message"
                    rows={4}
                    {...register("message", {
                      required: "Message is required",
                    })}
                  />
                  {errors?.message && (
                    <span className="text-red-500 text-sm">
                      {String(errors.message?.message)}
                    </span>
                  )}
                </div>
                <div className="mt-5 flex md:justify-start justify-center">
                  {homeForm?.button?.title && (
                    <Button
                      title={homeForm?.button?.title}
                      btnType={homeForm?.button?.btnType}
                      link={homeForm?.button?.link}
                      linkType={homeForm?.button?.linkType}
                      disabled={isSubmitSuccessful}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="md:col-span-7">
            <div 
              ref={mapContainerRef}
              className="w-full h-full overflow-hidden relative"
            >
              {!shouldLoadMap ? (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading map...</p>
                  </div>
                </div>
              ) : (
                <iframe
                  src={data?.mapUrl}
                  style={{ marginTop: isHome ? "-120px" : "0px" }}
                  title="google-map"
                  className="w-full h-full"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
