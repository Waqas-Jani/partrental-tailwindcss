"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@/components/common/SocialIcons";

type Props = {
  title: string;
  description: string;
};

// Accordion Component
const AccordionItem = ({
  item,
  isOpen,
  onClick,
  index,
}: {
  item: Props;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full py-6 px-0 text-left flex items-center justify-between group focus:outline-none transition-all duration-200 hover:bg-gray-50 rounded-lg"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${index}`}
      >
        {/* Title */}
        <h3 className="text-xl font-bold text-black group-hover:text-primary transition-colors duration-200">
          {item.title}
        </h3>

        {/* Chevron Icon */}
        <ChevronDownIcon
          cls={`w-5 h-5 text-black transition-transform duration-500 ease-in-out ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Content */}
      <div
        id={`accordion-content-${index}`}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-6 pt-2">
          <div className="text-black leading-relaxed text-base">
            {item.description && <p>{item.description}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Accordion Component
export default function Accordion({ items }: { items: Props[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-8">
      {items?.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
          index={index}
        />
      ))}
    </div>
  );
}
