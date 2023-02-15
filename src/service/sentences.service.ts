import { Avatar } from '../model/avatar.model';
import { generateKeywords } from './chat.service';

export function createIntroduction(input: Partial<Avatar>) {
  return "My name is " + input.name + ". And my origin land is "+ input.history+". Pretend to be me and tell me a short story of your past.";
}


export function createImageResume(input: Partial<Avatar>, keywords: string) {
  const resume = createIntroduction(input);

  return resume + "Draw a caracter face based on me and my history. The keywords of my history are: " + keywords +".";
}
