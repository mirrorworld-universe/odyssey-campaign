import { MODAL_HASH_MAP, openModalDirectly } from "@/app/hooks/useModalHash";

export default function Banner() {
  return (
    <div className="bg-black text-primary">
      <div className="max-w-view w-full mx-auto px-4 py-16">
        <div className="flex flex-col gap-4 max-w-[486px]">
          <div className="font-orbitron text-headline3">
            Odyssey Task Center
          </div>
          <p className="text-body3 text-tertary">
            Embark on your Odyssey by completing various tasks! Earn more rings
            along the way! If you have any questions, feel free to check out the
            <span
              className="text-link cursor-pointer"
              onClick={() => openModalDirectly(MODAL_HASH_MAP.faq)}
            >
              {` `}FAQs
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
