import {computed} from "vue";
import {differenceInDays, format, isValid} from "date-fns";

export function useDuration(date) {
  if (!isValid(new Date(date))) {
    return "";
  }

  return computed(() => {
    return differenceInDays(new Date(date), new Date());
  }) ;

}

export function useFormat(date, formatString = "MMMM Y") {
  if (!isValid(new Date(date))) {
    return "";
  }

  return format(new Date(date), formatString);
}
