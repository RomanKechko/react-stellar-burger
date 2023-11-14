export const url = "https://norma.nomoreparties.space/api";
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
}
export default checkResponse;
