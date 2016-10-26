export const StartGame = () => {
  return {
    type: 'START_GAME',
    payload: {}
  }
};

export const Click = data => {
  return {
    type: 'CLICK',
    payload: data.coords
  }
}
