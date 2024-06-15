import { create } from "zustand";
import { persist } from "zustand/middleware";

// export const useWelcomeModal = create(
//   persist<{
//     isOpen: boolean;
//     firstVisit: boolean;
//     onOpen: () => void;
//     onClose: () => void;
//   }>(
//     (set, get) => ({
//       isOpen: false,
//       firstVisit: get()?.firstVisit,
//       onOpen: () => {
//         set({
//           isOpen: true,
//           firstVisit: false,
//         });
//       },
//       onClose: () => {
//         set({
//           isOpen: false,
//           firstVisit: false,
//         });
//       },
//     }),
//     {
//       name: "sonic-welcome",
//     }
//   )
// );

export const useWelcomeModal = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({
      isOpen: true,
    });
  },
  onClose: () => {
    set({
      isOpen: false,
    });
  },
}));

export const useSetUpNetworkModal = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({
      isOpen: true,
    });
  },
  onClose: () => {
    set({
      isOpen: false,
    });
  },
}));

export const useSetUpFinishModal = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({
      isOpen: true,
    });
  },
  onClose: () => {
    set({
      isOpen: false,
    });
  },
}));

export const useMoreWalletModal = create<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({
      isOpen: true,
    });
  },
  onClose: () => {
    set({
      isOpen: false,
    });
  },
}));
