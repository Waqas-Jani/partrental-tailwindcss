"use client";

import React, { Fragment, RefObject } from "react";
import useClickOutside from "@/utils/useClickOutside";

const VideoPopup = ({
  videoURL,
  onClose,
}: {
  videoURL: string;
  onClose: () => void;
}) => {
  const [show, setShow] = React.useState(true);
  const domNode = useClickOutside(() => {
    setShow(false);
    onClose?.();
  });

  // Handle Escape key
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShow(false);
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!show) return null;

  // Function to get embed URL
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtube.com")
        ? url.split("v=")[1].split("&")[0]
        : url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (url.includes("vimeo.com")) {
      const videoId = url.split("vimeo.com/")[1];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return url;
  };

  return (
    <Fragment>
      {/* Background Overlay - Acts as close button */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => {
          setShow(false);
          onClose?.();
        }}
      >
        {/* Video Container - Clicking here won't close */}
        <div
          className="relative max-w-4xl w-full max-h-[80vh] bg-black rounded-lg overflow-hidden shadow-2xl"
          ref={domNode as RefObject<HTMLDivElement> | undefined}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            title="Close (Esc)"
            type="button"
            className="absolute cursor-pointer top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
            onClick={() => {
              setShow(false);
              onClose?.();
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Video Player */}
          <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 aspect ratio */}
            <iframe
              src={getEmbedUrl(videoURL)}
              title="Video Player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VideoPopup;
