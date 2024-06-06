export const setCursorPosition = (input: HTMLInputElement, position: number)=> {
  if(!input.setSelectionRange) return;

  setTimeout(() => {
    input.setSelectionRange(position, position);
  }, 0);
}
