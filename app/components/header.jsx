export function DashboardHeader({
  heading,
  text,
  children,
}) {
  return (
    <div className="flex items-center justify-between mb-6 px-4 sm:px-6 py-4 bg-transparent">
      <div className="grid gap-1">
        <h1 className="font-extrabold text-3xl md:text-4xl text-tealmain">
          {heading}
        </h1>
        {text && (
          <p className="text-lg text-graylight dark:text-gray-400">
            {text}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
