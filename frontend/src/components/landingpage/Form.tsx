import React, { useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Button from "../common/Button";

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

interface FormData {
  name: string;
  email: string;
  company: string;
  phoneno: string;
  revenue: string;
  started: boolean;
}

interface FormConfig {
  heading?: string;
  enable_name?: boolean;
  enable_company?: boolean;
  enable_phone?: boolean;
  enable_revenue?: boolean;
  sectionId?: string;
}

interface LandingPageFormProps {
  data: FormConfig;
  isHero?: boolean;
}

export default function LandingPageForm({
  data,
  isHero = false,
}: LandingPageFormProps) {
  const formData = useRef<FormData>({
    name: "",
    email: "",
    company: "",
    phoneno: "",
    revenue: "",
    started: false,
  });

  const abandonTimer = useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    mode: "onBlur",
  });

  // Submit abandoned form data
  const submitAbandonedForm = useCallback(() => {
    if (
      !formData.current.started ||
      (!formData.current.name && !formData.current.email)
    ) {
      return;
    }

    const abandonData = {
      data: {
        name: formData.current.name,
        email: formData.current.email,
        company: formData.current.company,
        phoneno: formData.current.phoneno,
        revenue: formData.current.revenue,
        form_status: "abandoned",
        pageURL: window.location.href,
        date: new Date().toUTCString(),
        website: window.location.origin,
      },
      sheetID: 94,
    };

    // Submit with keepalive for better reliability
    fetch("https://leads.civsav.com/template/contact", {
      method: "POST",
      body: JSON.stringify(abandonData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      keepalive: true,
    }).catch(() => {
      // Silent fail for abandoned forms
    });

    // Track in analytics
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "form_abandon",
        form_type: "landing_page_form",
        has_name: !!formData.current.name,
        has_email: !!formData.current.email,
      });
    }
  }, []);

  // Track field changes
  const trackFieldChange = useCallback(
    (name: keyof FormData, value: string) => {
      if (name !== "started") {
        formData.current[name] = value;

        if (!formData.current.started && value.trim()) {
          formData.current.started = true;
        }
      }
    },
    []
  );

  // Setup event listeners for form abandonment
  useEffect(() => {
    const scheduleAbandonedForm = () => {
      if (abandonTimer.current) {
        clearTimeout(abandonTimer.current);
      }
      abandonTimer.current = setTimeout(submitAbandonedForm, 3000);
    };

    const cancelAbandonedForm = () => {
      if (abandonTimer.current) {
        clearTimeout(abandonTimer.current);
        abandonTimer.current = null;
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (formData.current.started && !isSubmitSuccessful) {
        submitAbandonedForm();
        e.preventDefault();
        e.returnValue = "Are you sure you want to leave?";
        return "Are you sure you want to leave?";
      }
    };

    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "hidden" &&
        formData.current.started &&
        !isSubmitSuccessful
      ) {
        scheduleAbandonedForm();
      } else if (document.visibilityState === "visible") {
        cancelAbandonedForm();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAbandonedForm();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isSubmitSuccessful, submitAbandonedForm]);

  // Enhanced register function with field tracking
  const registerWithTracking = useCallback(
    (name: keyof FormData, options?: Record<string, unknown>) => {
      return {
        ...register(name, options),
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          trackFieldChange(name, e.target.value);
        },
        onInput: (e: React.FormEvent<HTMLInputElement>) => {
          trackFieldChange(name, (e.target as HTMLInputElement).value);
        },
      };
    },
    [register, trackFieldChange]
  );

  const onSubmit = async (data: Record<string, string>) => {
    const toastId = toast.loading("Submitting...");

    // Clear any pending abandon form submissions
    if (abandonTimer.current) {
      clearTimeout(abandonTimer.current);
      abandonTimer.current = null;
    }

    const formPayload = {
      data: {
        ...data,
        form_status: "completed",
        pageURL: window.location.href,
        date: new Date().toUTCString(),
        website: window.location.origin,
      },
      sheetID: 94,
    };

    try {
      const response = await fetch(
        "https://leads.civsav.com/template/contact",
        {
          method: "POST",
          body: JSON.stringify(formPayload),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      await response.json();

      // Reset form data
      formData.current = {
        name: "",
        email: "",
        company: "",
        phoneno: "",
        revenue: "",
        started: false,
      };

      reset();
      toast.dismiss(toastId);

      // Track successful submission
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "generate_lead",
        });
      }

      if (typeof window !== "undefined" && window.gtag) {
        const utmData = JSON.parse(sessionStorage.getItem("utm_data") || "{}");
        window.gtag("event", "conversion", {
          send_to: "G-LQK0SSBDY6",
          utm_source: utmData.source || "(direct)",
          utm_medium: utmData.medium || "(none)",
          utm_campaign: utmData.campaign || "(not set)",
          value: 1.0,
          currency: "USD",
        });
      }

      toast.success("Request has been submitted successfully");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong! Please try again");
    }
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
              {...registerWithTracking("name", {
                required: "Name is required",
              })}
            />
            {errors?.name && (
              <span className="text-red-500" style={{ marginTop: -15 }}>
                {String(errors.name?.message)}
              </span>
            )}
          </div>
        )}
        <div className="">
          <input
            type="email"
            className="input-field-primary border border-gray-300 rounded-md p-4 outline-none"
            placeholder="Email Address"
            {...registerWithTracking("email", {
              required: "Email is required",
            })}
          />
          {errors?.email && (
            <span className="text-red-500" style={{ marginTop: -15 }}>
              {String(errors.email?.message)}
            </span>
          )}
        </div>
        {data?.enable_company && (
          <div className="">
            <input
              type="text"
              className="input-field-primary border border-gray-300 rounded-md p-4 outline-none"
              placeholder="Company Name"
              {...registerWithTracking("company")}
            />
            {errors?.company && (
              <span className="text-red-500" style={{ marginTop: -15 }}>
                {String(errors.company?.message)}
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
              {...registerWithTracking("phoneno")}
            />
            {errors?.phoneno && (
              <span className="text-red-500" style={{ marginTop: -15 }}>
                {String(errors.phoneno?.message)}
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
              {...registerWithTracking("revenue")}
            />
            {errors?.revenue && (
              <span className="text-red-500" style={{ marginTop: -15 }}>
                {String(errors.revenue?.message)}
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
