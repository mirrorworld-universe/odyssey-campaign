import { Ring } from "@/app/icons/Ring";

export default function PcData({ seasons }: { seasons: any[] }) {
  return (
    <div className="hidden md:block">
      {seasons.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-[140px_180px_140px_140px_200px_160px] gap-x-12 sonic-title2 h-14 items-center"
        >
          <p className="flex items-center gap-2">{item.season}</p>
          <p>{item.network}</p>
          <p>{item.startDate}</p>
          <p>{item.endDate}</p>
          <p>{item.snapshotDate}</p>
          <p className="flex items-center gap-1">
            <Ring width={16} height={16} color="#FBB042" />
            {item.rings}
          </p>
        </div>
      ))}
    </div>
  );
}
