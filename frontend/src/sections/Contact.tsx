"use client";
import React from "react";
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
            <div className="w-full h-full overflow-hidden">
              <iframe
                src={data?.mapUrl}
                style={{ marginTop: isHome ? "-120px" : "0px" }}
                title="google-map"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
