"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Calendar,
  User,
  Mail,
  Phone,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Truck,
  Store,
  ChevronDown,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import styles from "./ReservationForm.module.css";

const DELIVERY_STATES = ["NY", "NJ", "CT", "PA", "MA", "Other"];

const ReservationForm = ({
  isOpen,
  onClose,
  productTitle,
  product,
  locations = [],
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    selectedVariants: [],
    dateFrom: "",
    dateTo: "",
    deliveryMethod: "",
    pickupCity: "",
    deliveryCity: "",
    deliveryState: "",
    otherState: "",
  });
  const [errors, setErrors] = useState({});

  // Add formState ref to track form data without re-renders
  const formState = useRef({
    started: false,
    lastFieldChanged: null,
    nameValue: "",
    emailValue: "",
    debugMessages: "",
    abandonTimer: null,
  });

  // Add formStarted state
  const [formStarted, setFormStarted] = useState(false);

  // Reset success state when form is closed/reopened
  useEffect(() => {
    if (isOpen) {
      setShowSuccess(false);
    }
  }, [isOpen]);

  // Add debug logging function
  const logDebug = useCallback((message) => {
    const timestamp = new Date().toISOString();
    formState.current.debugMessages += `\n${timestamp}: ${message}`;
    console.log(`DEBUG: ${message}`);
  }, []);

  // Add submit abandoned form function
  const submitAbandonedForm = useCallback(() => {
    // Only submit if we have at least name or email
    if (
      !formState.current.started ||
      (!formState.current.nameValue && !formState.current.emailValue)
    ) {
      logDebug("Abandoned form not submitted - no data or not started");
      return;
    }

    try {
      // Create object with only name and email
      const abandonData = {
        data: {
          name: formState.current.nameValue,
          email: formState.current.emailValue,
          form_status: "abandoned",
          product_name: productTitle,
          page_url: window.location.href,
          date: new Date().toUTCString(),
          website: window.location.origin,
        },
        sheetID: 88,
      };

      logDebug(`Sending abandoned form data: ${JSON.stringify(abandonData)}`);

      // Use fetch with keepalive
      fetch("https://leads.civsav.com/template/contact", {
        method: "POST",
        body: JSON.stringify(abandonData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        keepalive: true,
      }).catch((err) => {
        logDebug(`Fetch error: ${err.message}`);
      });

      // Track the abandoned form in analytics
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "form_abandon",
          form_type: "reservation_form",
          has_name: !!formState.current.nameValue,
          has_email: !!formState.current.emailValue,
          last_field_completed: formState.current.lastFieldChanged,
        });
        logDebug("GTM event pushed");
      }
    } catch (error) {
      logDebug(`Error in abandoned form: ${error.message}`);
    }
  }, [logDebug, productTitle]);

  // Add form tracking effect
  useEffect(() => {
    // Function to schedule abandoned form submission with delay
    const scheduleAbandonedFormSubmission = () => {
      // Clear any existing timer
      if (formState.current.abandonTimer) {
        clearTimeout(formState.current.abandonTimer);
        logDebug("Cleared existing abandon timer");
      }

      // Set a new timer (3 seconds delay)
      logDebug("Scheduling abandoned form submission in 3 seconds");
      formState.current.abandonTimer = setTimeout(() => {
        logDebug("Executing delayed abandoned form submission");
        submitAbandonedForm();
        formState.current.abandonTimer = null;
      }, 3000); // 3 second delay
    };

    // Function to cancel scheduled submission
    const cancelScheduledSubmission = () => {
      if (formState.current.abandonTimer) {
        clearTimeout(formState.current.abandonTimer);
        formState.current.abandonTimer = null;
        logDebug("Canceled scheduled abandon form submission");
      }
    };

    // Event handler for beforeunload
    const handleBeforeUnload = (e) => {
      logDebug(
        `BeforeUnload triggered - Name: ${formState.current.nameValue}, Email: ${formState.current.emailValue}`
      );

      if (
        formState.current.started &&
        !showSuccess &&
        (formState.current.nameValue || formState.current.emailValue)
      ) {
        logDebug("Submitting abandoned form immediately (beforeunload)");
        // Submit immediately since the page is closing
        submitAbandonedForm();

        // Standard way to show confirmation dialog (required by some browsers)
        e.preventDefault();
        e.returnValue = "Are you sure you want to leave?";
        return "Are you sure you want to leave?";
      }
    };

    // Event handler for visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // User switched away from tab - schedule submission with delay
        logDebug(`Visibility changed to: hidden`);

        if (
          formState.current.started &&
          !showSuccess &&
          (formState.current.nameValue || formState.current.emailValue)
        ) {
          logDebug("Scheduling abandoned form submission (visibility:hidden)");
          scheduleAbandonedFormSubmission();
        }
      } else if (document.visibilityState === "visible") {
        // User returned to tab - cancel scheduled submission
        logDebug(`Visibility changed to: visible`);
        cancelScheduledSubmission();
      }
    };

    // Set up event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Return cleanup function
    return () => {
      cancelScheduledSubmission();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [showSuccess, logDebug, submitAbandonedForm]);

  // Modify handleInputChange to track form data
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    // Track form data for abandonment
    if (field === "name") {
      formState.current.nameValue = value;
      formState.current.lastFieldChanged = "name";
    } else if (field === "email") {
      formState.current.emailValue = value;
      formState.current.lastFieldChanged = "email";
    }

    // Mark form as started if not already
    if (!formState.current.started) {
      formState.current.started = true;
      setFormStarted(true);
      logDebug(`Form started with ${field} field`);
    }

    // Reset dependent fields when delivery method changes
    if (field === "deliveryMethod") {
      setFormData((prev) => ({
        ...prev,
        pickupCity: "",
        deliveryCity: "",
        deliveryState: "",
      }));
    }
  };

  const handleVariantChange = (variant) => {
    setFormData((prev) => {
      const updatedVariants = prev.selectedVariants.includes(variant)
        ? prev.selectedVariants.filter((v) => v !== variant)
        : [...prev.selectedVariants, variant];

      return {
        ...prev,
        selectedVariants: updatedVariants,
      };
    });
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDeliveryMethod = () => {
    const newErrors = {};

    if (!formData.deliveryMethod) {
      newErrors.deliveryMethod = "Please select a delivery method";
    } else if (formData.deliveryMethod === "delivery") {
      if (!formData.deliveryState) {
        newErrors.deliveryState = "Please select a state";
      }
      if (!formData.deliveryCity) {
        newErrors.deliveryCity = "Please enter a city";
      }
    } else if (formData.deliveryMethod === "pickup") {
      if (!formData.pickupCity) {
        newErrors.pickupCity = "Please select a pickup location";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault(); // Prevent any form submission

    if (currentStep === 1 && !validateStep1()) {
      return;
    }

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = (e) => {
    e.preventDefault(); // Prevent any form submission

    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Final validation before submission
    if (!validateDeliveryMethod()) {
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    console.log("Form submitted:");

    // Here you would typically send the data to your backend
    const toastId = toast.loading("Submitting...");
    const d = {
      data: {
        name: formData.name,
        email: formData.email,
        phoneno: formData.phone,
        product_name: productTitle,
        product_variants: formData.selectedVariants.join(", "),
        rent_from: formData.dateFrom,
        rent_to: formData.dateTo,
        delivery_method: formData.deliveryMethod,
        delivery_state:
          formData.deliveryState === "Other"
            ? formData.otherState
            : formData.deliveryState,
        delivery_city: formData.deliveryCity,
        pickup_location: formData.pickupCity,
        page_url: window.location.href,
        date: new Date().toUTCString(),
        website: window.location.origin,
      },
      sheetID: 86,
    };

    fetch("https://leads.civsav.com/template/contact", {
      method: "POST",
      body: JSON.stringify(d),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(() => {
        toast.dismiss(toastId);
        if (typeof window !== "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "generate_lead",
          });
        }
        toast.success("Request has been submitted successfully");
        setShowSuccess(true); // Only show success message after successful API call
        setIsSubmitting(false);
      })
      .catch(() => {
        toast.dismiss(toastId);
        toast.error("Something went wrong! Please try again");
        setShowSuccess(false);
        setIsSubmitting(false);
      });
  };

  // Modify resetForm to reset abandonment tracking
  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      email: "",
      name: "",
      phone: "",
      selectedVariants: [],
      dateFrom: "",
      dateTo: "",
      deliveryMethod: "",
      pickupCity: "",
      deliveryCity: "",
      deliveryState: "",
      otherState: "",
    });
    setErrors({});
    setShowSuccess(false);
    setIsSubmitting(false);

    // Reset form state
    formState.current = {
      started: false,
      lastFieldChanged: null,
      nameValue: "",
      emailValue: "",
      debugMessages: "",
      abandonTimer: null,
    };
    setFormStarted(false);
  };

  const handleClose = () => {
    // Check if form was started and has data before closing
    if (
      formState.current.started &&
      !showSuccess &&
      (formState.current.nameValue || formState.current.emailValue)
    ) {
      logDebug("Submitting abandoned form on popup close");
      submitAbandonedForm();
    }

    onClose();
    resetForm();
  };

  if (!isOpen) return null;

  const getStepTitle = (step) => {
    switch (step) {
      case 1:
        return "Contact Information";
      case 2:
        return "Select Product Variant";
      case 3:
        return "Select Dates";
      case 4:
        return "Delivery Method";
      default:
        return "";
    }
  };

  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.step}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <Mail size={16} />
                Email Address *
              </label>
              <input
                type="email"
                className={`${styles.input} ${
                  errors.email ? styles.inputError : ""
                }`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <User size={16} />
                Full Name *
              </label>
              <input
                type="text"
                className={`${styles.input} ${
                  errors.name ? styles.inputError : ""
                }`}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                <Phone size={16} />
                Phone Number *
              </label>
              <input
                type="tel"
                className={`${styles.input} ${
                  errors.phone ? styles.inputError : ""
                }`}
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
              {errors.phone && (
                <span className={styles.errorText}>{errors.phone}</span>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.step}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Select Product Variants</label>
              <div className={styles.variantOptions}>
                {product?.variants?.map((variant, index) => (
                  <label key={index} className={styles.variantOption}>
                    <input
                      type="checkbox"
                      checked={formData.selectedVariants.includes(variant)}
                      onChange={() => handleVariantChange(variant)}
                      className={styles.variantCheckbox}
                    />
                    <span className={styles.variantLabel}>{variant}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.step}>
            <div className={styles.dateSection}>
              <h3 className={styles.sectionTitle}>
                <Calendar size={20} />
                Select Rental Dates
              </h3>

              <div className={styles.dateInputsContainer}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>From Date</label>
                  <input
                    type="date"
                    className={`${styles.input} ${styles.dateInput}`}
                    value={formData.dateFrom}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) =>
                      handleInputChange("dateFrom", e.target.value)
                    }
                  />
                </div>

                <div className={styles.dateSeparator}>
                  <ArrowRight size={20} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>To Date</label>
                  <input
                    type="date"
                    className={`${styles.input} ${styles.dateInput}`}
                    value={formData.dateTo}
                    min={
                      formData.dateFrom ||
                      new Date().toISOString().split("T")[0]
                    }
                    onChange={(e) =>
                      handleInputChange("dateTo", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={styles.step}>
            <div className={styles.deliveryMethodSection}>
              <h3 className={styles.sectionTitle}>
                <Truck size={20} />
                Choose Delivery Method
              </h3>
              <div className={styles.deliveryOptions}>
                <button
                  type="button"
                  className={`${styles.deliveryOption} ${
                    formData.deliveryMethod === "delivery" ? styles.active : ""
                  }`}
                  onClick={() =>
                    handleInputChange("deliveryMethod", "delivery")
                  }
                >
                  <Truck size={32} />
                  <span>Delivery Service</span>
                </button>
                <button
                  type="button"
                  className={`${styles.deliveryOption} ${
                    formData.deliveryMethod === "pickup" ? styles.active : ""
                  }`}
                  onClick={() => handleInputChange("deliveryMethod", "pickup")}
                >
                  <Store size={32} />
                  <span>Store Pickup</span>
                </button>
              </div>

              {errors.deliveryMethod && (
                <span className={styles.errorText}>
                  {errors.deliveryMethod}
                </span>
              )}

              {formData.deliveryMethod === "delivery" && (
                <div className={styles.deliveryDetails}>
                  <div className={styles.formGroup}>
                    <div className={styles.locationIcon}>
                      <MapPin size={16} />
                      <label className={styles.label}>State</label>
                    </div>
                    <div className={styles.selectWrapper}>
                      <select
                        className={`${styles.select} ${
                          errors.deliveryState ? styles.inputError : ""
                        }`}
                        value={formData.deliveryState}
                        onChange={(e) => {
                          handleInputChange("deliveryState", e.target.value);
                          if (e.target.value !== "Other") {
                            handleInputChange("otherState", "");
                          }
                          // Clear city when state changes
                          handleInputChange("deliveryCity", "");
                        }}
                      >
                        <option value="">Select a state</option>
                        {DELIVERY_STATES.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className={styles.selectIcon} size={18} />
                    </div>
                    {errors.deliveryState && (
                      <span className={styles.errorText}>
                        {errors.deliveryState}
                      </span>
                    )}
                    {formData.deliveryState === "Other" && (
                      <div className={styles.otherStateInput}>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="Enter your state"
                          value={formData.otherState}
                          onChange={(e) =>
                            handleInputChange("otherState", e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>

                  {formData.deliveryState && formData.deliveryState !== "" && (
                    <div className={styles.formGroup}>
                      <div className={styles.locationIcon}>
                        <MapPin size={16} />
                        <label className={styles.label}>City</label>
                      </div>
                      <input
                        type="text"
                        className={`${styles.input} ${
                          errors.deliveryCity ? styles.inputError : ""
                        }`}
                        placeholder="Enter city"
                        value={formData.deliveryCity}
                        onChange={(e) =>
                          handleInputChange("deliveryCity", e.target.value)
                        }
                      />
                      {errors.deliveryCity && (
                        <span className={styles.errorText}>
                          {errors.deliveryCity}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {formData.deliveryMethod === "pickup" && (
                <div className={styles.pickupSection}>
                  <div className={styles.locationSelect}>
                    <div className={styles.locationIcon}>
                      <MapPin size={16} />
                      <label className={styles.label}>Pickup Location</label>
                    </div>
                    <div className={styles.selectWrapper}>
                      <select
                        className={`${styles.select} ${
                          errors.pickupCity ? styles.inputError : ""
                        }`}
                        value={formData.pickupCity}
                        onChange={(e) =>
                          handleInputChange("pickupCity", e.target.value)
                        }
                      >
                        <option value="">Select a location</option>
                        {locations.map((location) => (
                          <option key={location._id} value={location.title}>
                            {location.title}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className={styles.selectIcon} size={18} />
                    </div>
                    {errors.pickupCity && (
                      <span className={styles.errorText}>
                        {errors.pickupCity}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{getStepTitle(currentStep)}</h2>
          <button
            type="button"
            onClick={handleClose}
            className={styles.closeButton}
          >
            <X size={24} />
          </button>
        </div>

        <div className={styles.productInfo}>
          <p className={styles.productTitle}>{productTitle}</p>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          <div className={styles.stepNumbers}>
            {[1, 2, 3, 4].map((step) => (
              <span
                key={step}
                className={`${styles.stepNumber} ${
                  currentStep >= step ? styles.active : ""
                }`}
              >
                {step}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.content}>{renderStepContent()}</div>

        <div className={styles.footer}>
          <div className={styles.buttonGroup}>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className={styles.secondaryButton}
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className={styles.primaryButton}
                disabled={
                  currentStep === 1 &&
                  (!formData.email || !formData.name || !formData.phone)
                }
              >
                Next Step
                <ArrowRight size={16} />
              </button>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ margin: 0 }}>
                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            )}
          </div>
        </div>

        {showSuccess && (
          <div className={styles.successOverlay}>
            <CheckCircle className={styles.successIcon} />

            <p className={styles.successMessage}>
              Thanks for submitting your reservation request, someone from our
              team will reach out to you within 30 minutes or less.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className={styles.closeSuccessButton}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ReservationForm;
