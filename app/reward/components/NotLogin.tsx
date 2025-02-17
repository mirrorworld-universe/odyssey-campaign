import { EmptyLogo } from "@/app/logos/EmptyLogo";
import { useSystemInfo, useWalletModal } from "@/app/store/account";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotLogin() {
  const { isInMaintenance } = useSystemInfo();
  const { onOpen } = useWalletModal();

  const handleOpenWalletDialog = () => {
    !isInMaintenance && onOpen();
  };

  return (
    <div className="flex-v items-center py-[120px]">
      <EmptyLogo className="size-10" />
      <p className="sonic-title3 text-disable mt-2 mb-4 font-orbitron">
        No Record
      </p>
      <Button
        className={cn(
          "sonic-title3",
          !isInMaintenance ? "cursor-pointer" : "opacity-30 cursor-not-allowed"
        )}
        variant={"primary"}
        size={"sm"}
        onClick={handleOpenWalletDialog}
      >
        Connect Wallet
      </Button>
    </div>
  );
}
