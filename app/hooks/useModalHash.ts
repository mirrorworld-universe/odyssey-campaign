import { useCallback, useState } from "react";
import { useLifecycles } from "react-use";

/**
 * read and write url hash, response to url hash change
 */
export default function useModalHash(addToHistory = false) {
  const [modalHash, setModalHash] = useState(
    () => window.location.hash as ModalHashValues
  );

  const onHashChange = useCallback(() => {
    setModalHash(window.location.hash as ModalHashValues);
  }, []);

  useLifecycles(
    () => {
      window.addEventListener("hashchange", onHashChange);
    },
    () => {
      window.removeEventListener("hashchange", onHashChange);
    }
  );

  const _setHash = useCallback(
    (newHash: ModalHashValues) => {
      if (newHash !== modalHash) {
        if (!addToHistory) {
          history.replaceState(null, "", newHash);
          const event = new HashChangeEvent("hashchange");
          window.dispatchEvent(event);
        } else {
          window.location.hash = newHash;
        }
      }
    },
    [modalHash, addToHistory]
  );

  return {
    modalHash,
    openModal: _setHash,
    closeModal: () => _setHash(MODAL_HASH_MAP.empty)
  };
}

export const MODAL_HASH_MAP = {
  empty: "#",
  welcome: "#/modal/welcome",
  setUpSonicNetwork: "#/modal/setUpSonicNetwork",
  setUpFinish: "#/modal/setUpFinish",
  faq: "#/modal/faq",
  howToPlay: "#/modal/howToPlay",
  switchNetwork: "#/modal/switchNetwork"
} as const;

export type ModalHashValues =
  (typeof MODAL_HASH_MAP)[keyof typeof MODAL_HASH_MAP];

export function openModalDirectly(hash: ModalHashValues) {
  history.replaceState(null, "", hash);
  const event = new HashChangeEvent("hashchange");
  window.dispatchEvent(event);
}
