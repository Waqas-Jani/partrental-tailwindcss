export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="mt-4 text-primary font-semibold text-lg">
          Loading...
        </span>
      </div>
    </div>
  );
}
