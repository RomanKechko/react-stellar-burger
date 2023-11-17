export const url: string = "https://norma.nomoreparties.space/api";

export default function checkResponse(res: any) {
  if (res.ok) {
    return res.json();
  } else {
    console.error("Error in response:", res.status, res.statusText);
    return res.json().then((err: any) => Promise.reject(err));
  }
}
