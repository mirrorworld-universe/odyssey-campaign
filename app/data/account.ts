import { API_BASE_URL } from "./config";

export const fetchBasicInfo = async (address: string) => {
  // const response = await fetch(`${API_BASE_URL.staging}/auth/sonic/challenge`, {
  //   method: "GET",
  //   body: JSON.stringify({
  //     wallet: address,
  //   }),
  // });
  const response = await fetch(
    `${API_BASE_URL.staging}/auth/sonic/challenge?${new URLSearchParams({
      wallet: address,
    })}`
  );
  return response.json();
};

export const fetchAuthorize = async (
  address: string,
  address_encoded: string,
  signature: string
) => {
  const response = await fetch(`${API_BASE_URL.staging}/auth/sonic/authorize`, {
    method: "POST",
    body: JSON.stringify({
      address,
      address_encoded,
      signature,
    }),
  });
  return response.json();
};
