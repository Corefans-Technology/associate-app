import { ref } from "vue";

export function useCurrency(amount, type = "NGN", locale = "en-NG", display = "code") {
  const amt = amount.replace(".", "").replace(",", "").replace(/\D/g, "");
  const result = ref("");


  result.value = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: type,
    // currencyDisplay: display,
    minimumFractionDigits: 2,
  }).format(parseFloat(amt) / 100);

  return result.value;
}