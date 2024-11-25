import { Tag } from "@/app/components/Basic/Tag";
import { Ring } from "@/app/icons/Ring";

export default function PcData() {
  return (
    <div className="hidden md:block">
      <div className="grid grid-cols-[140px_180px_140px_140px_200px_160px] gap-x-12 sonic-title2 h-14 items-center">
        <p className="flex items-center gap-2">
          Season 3 <Tag text="Current" />
        </p>
        <p>Devnet</p>
        <p>2024-09-01</p>
        <p>2024-09-30</p>
        <p>2024-09-15</p>
        <p className="flex items-center gap-1">
          <Ring width={16} height={16} color="#FBB042" />
          100
        </p>
      </div>
    </div>
  );
}
