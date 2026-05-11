import { Skeleton } from "./skeleton";

const VehicleCardSkeleton = () => {
  return (
    <div className="w-full flex gap-5 shadow-xl bg-white/6 border border-white/10 rounded-2xl p-5 space-y-4 backdrop-blur-sm">
      <Skeleton className="h-40 w-full bg-white/12" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-8 w-full bg-white/12" />
        <Skeleton className="h-30 w-full bg-white/12" />
      </div>
    </div>
  );
};

export default VehicleCardSkeleton;
