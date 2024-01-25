import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function infoToast(message: string) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
}

export function errorToast(message: string) {
  Toastify({
    text: message,
    duration: 10000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "red",
    },
  }).showToast();
}
