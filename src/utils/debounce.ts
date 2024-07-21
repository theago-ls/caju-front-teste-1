export function debounce(callback: Function, delay: number) {
  let timer: NodeJS.Timeout
  
  return function(args: any) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(args);
    }, delay)
  }
}