import React from "react";
import Button from "../common/Button";
import { useFormSubmission } from "@/hooks/useFormSubmission";

// Extend Window interface for analytics
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

type FormFieldName = "name" | "email" | "company" | "phone" | "revenue";

interface FormConfig {
  heading?: string;
  enable_name?: boolean;
  enable_company?: boolean;
  enable_phone?: boolean;
  enable_revenue?: boolean;
  sectionId?: string;
  formId?: string;
  company_field_label?: string;
  company_field_placeholder?: string;
}

interface LandingPageFormProps {
  data: FormConfig;
  isHero?: boolean;
}

export default function LandingPageForm({
  data,
  isHero = false,
}: LandingPageFormProps) {
  const {
    registerWithTracking,
    handleSubmit,
    errors,
    isSubmitSuccessful,
    submitCompletedForm,
  } = useFormSubmission({
    formId: "690b4ec7",
    formName: "landing-page-form",
    trackingFields: [
      ...(data.enable_name ? ["name"] : []),
      "email",
      ...(data.enable_company ? ["company"] : []),
      ...(data.enable_phone ? ["phone"] : []),
      ...(data.enable_revenue ? ["revenue"] : []),
    ],
  });

  // Custom submit handler that sets default name if empty
  const onSubmit = async (formData: any) => {
    // If name field is enabled but empty, set it to "Landing page"
    if (!formData.name || formData.name.trim() === "") {
      formData.name = "Landing page";
    }
    await submitCompletedForm(formData);
  };

  // Render form content
  const formContent = (
    <div className={`${isHero ? "" : "w-full"}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {data.enable_name && (
          <div className="">
            <input
              type="text"
              className="input-field-primary border border-gray-300 rounded-md p-4 outline-none"
              placeholder="Full Name"
              {...registerWithTracking("name" as FormFieldName, {
                required: "Name is required",
              })}
            />
            {(
              errors as unknown as Partial<
                Record<FormFieldName, { message?: string }>
              >
            ).name && (
              <span className="text-red-500" style={{ marginTop: -15 }}>
                {String(
                  (
                    errors as unknown as Partial<
                      Record<FormFieldName, { message?: string }>
                    >
                  ).name?.message
                )}
              </span>
            )}
          </div>
        )}
        <div className="">
          <input
            type="email"
            className="input-field-primary border border-gray-300 rounded-md p-4 outline-none"
            placeholder="Email Address"
            {...registerWithTracking("email" as FormFieldName, {
              required: "Email is required",
            })}
          />
          {(
            errors as unknown as Partial<
              Record<FormFieldName, { message?: string }>
            >
          ).email && (
            <span className="text-red-500" style={{ marginTop: -15 }}>
              {String(
                (
                  errors as unknown as Partial<
                    Record<FormFieldName, { message?: string }>
                  >
                ).email?.message
              )}
            </span>
          )}
        </div>
        {data?.enable_company && (
          <div className="">
            {/* {data.company_field_label && (
      <label htmlFor="companyField" className="block mb-2 font-medium">
        {data.company_field_label}
      </label>
    )} */}

            <input
              id="companyField"
              type="text"
              className="input-field-primary border border-gray-300 rounded-md p-4 outline-none"
              placeholder={data.company_field_placeholder}
              {...registerWithTracking("company" as FormFieldName, {})}
            />

            {(
              errors as unknown as Partial<
                Record<FormFieldName, { message?: string }>
              >
            ).company && (
              <span className="text-red-500" style={{ marginTop: -15 }}>
                {String(
                  (
                    errors as unknown as Partial<
                      Record<FormFieldName, { message?: string }>
                    >
                  ).company?.message
                )}
              </span>
            )}
          </div>
        )}

        {data?.enable_phone && (
          <div className="">
            <input
              type="text"
              className="input-field-primary border border-gray-300 rounded-md p-4 outline-none"
              placeholder="Phone Number"
              {...registerWithTracking("phone" as FormFieldName, {})}
            />
            {(
              errors as unknown as Partial<
                Record<FormFieldName, { message?: string }>
              >
            ).phone && (
              <span className="text-red-500" style={{ marginTop: -15 }}>
                {String(
                  (
                    errors as unknown as Partial<
                      Record<FormFieldName, { message?: string }>
                    >
                  ).phone?.message
                )}
              </span>
            )}
          </div>
        )}
        {data?.enable_revenue && (
          <div className="">
            <input
              type="text"
              className="input-field-primary border border-gray-300 rounded-md p-4 outline-none"
              placeholder="What's your company annual revenue?"
              {...registerWithTracking("revenue" as FormFieldName, {})}
            />
            {(
              errors as unknown as Partial<
                Record<FormFieldName, { message?: string }>
              >
            ).revenue && (
              <span className="text-red-500" style={{ marginTop: -15 }}>
                {String(
                  (
                    errors as unknown as Partial<
                      Record<FormFieldName, { message?: string }>
                    >
                  ).revenue?.message
                )}
              </span>
            )}
          </div>
        )}

        <div className="flex mt-5">
          <Button
            title={"Submit"}
            btnType={"primary"}
            link={"#"}
            linkType={"normal"}
            disabled={isSubmitSuccessful}
          />
        </div>
      </form>
    </div>
  );

  // If it's a hero form, return just the form content without the section wrapper
  if (isHero) {
    return formContent;
  }

  // Otherwise return the full section with wrapper
  return (
    <section id={data?.sectionId?.replace(/\s+/g, "") ?? ""} className="">
      <div className="max-w-5xl mx-auto px-10">
        <div className="w-full">
          <div className="shadow-none w-full">
            <div className="text-left mb-8">
              <h2 className="mb-8 text-2xl font-bold">{data?.heading}</h2>
            </div>
            {formContent}
          </div>
        </div>
      </div>
    </section>
  );
}
