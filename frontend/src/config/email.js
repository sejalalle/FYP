
import { init } from '@emailjs/browser';

const initEmailJS = () => {
  init(process.env.o2V3EloUSlOPaRl5q); // Initialize EmailJS with your public key from .env
};

export default initEmailJS;
