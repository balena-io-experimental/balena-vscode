import { readFileSync } from 'fs';

export let getBalenaToken = (profileName?: string) => {
  return readFileSync(`${process.env['USERPROFILE']}\\.balenaToken`);
}