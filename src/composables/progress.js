export function useProgress(goal, raised) {
  let progress = 0;

  if (goal !== 0) {
    progress = ((raised / goal)  * 100).toFixed(1);
  }

  return Number(progress);
}
