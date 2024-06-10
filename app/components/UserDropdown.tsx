import { useMutation } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  formatAddress,
  useAccountInfo,
  useWalletModal,
} from "../store/account";
import { fetchLogout } from "../data/account";

export function UserDropdown() {
  const { isOpen, onOpen } = useWalletModal();
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();
  const { address, token, reset } = useAccountInfo();

  const mutationLogout = useMutation({
    mutationFn: () => fetchLogout({ token }),
    onSuccess: () => {
      reset();
    },
  });

  const handleClickOpenWallet = () => {
    !publicKey && onOpen();
    // window.ttq?.track('ClickButton', {
    //   contents: [
    //     {
    //       content_id: '0001',
    //       content_type: 'Sonic',
    //       content_name: 'ClickButton'
    //     }
    //   ],
    //   value: '1',
    //   currency: 'USD'
    // });
  };

  const handleDisconnect = async () => {
    disconnect();
    mutationLogout.mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="flex flex-row gap-2 border-solid border border-white/40 hover:border-white/80 px-5 py-[10px] rounded-[4px] cursor-pointer transition-all duration-300"
          onClick={handleClickOpenWallet}
          title={publicKey?.toBase58()}
        >
          <img src="/images/wallet.svg" alt="" />
          <span className="text-white font-semibold font-orbitron">
            {formatAddress(publicKey?.toBase58())}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]">
        {/* <DropdownMenuItem asChild>
      {balance ? (
        <div>{toFixed(balance, 2)} SOL</div>
      ) : (
        <div>0 SOL</div>
      )}
    </DropdownMenuItem>
    <DropdownMenuItem asChild>
      <span>TX history</span>
    </DropdownMenuItem>
    <DropdownMenuItem asChild>
      <span>Set up Sonic Network</span>
    </DropdownMenuItem> */}
        <DropdownMenuItem className="flex justify-center">
          <Button
            className="z-50 text-[16px]  text-white font-orbitron"
            onClick={handleDisconnect}
          >
            Disconnect
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
