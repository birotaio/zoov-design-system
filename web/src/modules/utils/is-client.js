// new Function is bound to global so we use it to detect the presence of window
const checkIsClient = new Function(`
try {
  return this === window;
} catch(e) {
  return false;
}
`);

export default checkIsClient();
