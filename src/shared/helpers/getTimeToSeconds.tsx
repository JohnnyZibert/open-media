export const getTime = (time: number) => {
  return time
    ? Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    : "0:00";
};
