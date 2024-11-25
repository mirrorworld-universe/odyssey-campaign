import { EmptyLogo } from "@/app/logos/EmptyLogo";
import { useWalletModal } from "@/app/store/account";
import { Button } from "@/components/ui/button";

export default function NotLogin() {
  const { onOpen } = useWalletModal();
  return (
    <div className="flex-v items-center py-[120px]">
      <EmptyLogo className="size-10" />
      <p className="sonic-title3 text-disable mt-2 mb-4">No Record</p>
      <Button
        className="sonic-title3"
        variant={"primary"}
        size={"sm"}
        onClick={onOpen}
      >
        Connect Wallet
      </Button>
    </div>
  );
}
