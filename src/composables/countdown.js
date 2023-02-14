import { ref, onMounted, onUnmounted, watch } from "vue";

export function useCountdown(time = 120) {

  const remainingTime = ref(time);
  let timer;

  timer = setInterval(() => {
    remainingTime.value--;

    if (remainingTime.value === 0) {
      clearInterval(timer);
    }
  }, 1000);


  onUnmounted(() => {
    clearInterval(timer);
  });

  const minutes = ref(0);
  const seconds = ref(0);

  watch(remainingTime, (newValue) => {
    minutes.value = Math.floor(newValue / 60);
    seconds.value = newValue % 60;
  });


  const pad = (value) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  const formatter = (minutes, seconds) => {
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  return {
    formatter,
    minutes,
    seconds,
  };
}