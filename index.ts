import { colorLetter } from "./text.ts";

const TRIES = 5;
let RESULT = "";

const MAX_POKE = 825;

const RAMDOM_POKE = Math.ceil(Math.random() * MAX_POKE);
let pokemon = "";

pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + RAMDOM_POKE)
  .then((res) => res.json())
  .then((response) => (pokemon = response.name.toUpperCase()));

function question() {
  const res = prompt("Enter the name of the pokemon ....");
  if (res === null) {
    return { error: "🧻  You have to write something" };
  } else if (res.length !== pokemon.length) {
    return { error: "📏  You  have to write only " + pokemon.length };
  } else if (!/^[a-zA-Z]+$/.test(res)) {
    return { error: "😟 You need to write text" };
  }
  return { res: res.toUpperCase() };
}

function print(word: string) {
  console.clear();

  let result = "";
  const letters = [...word];
  letters.forEach((letter, index) => {
    if (letter === pokemon[index]) {
      result += colorLetter("green", letter);
    } else if (pokemon.includes(letter)) {
      result += colorLetter("yellow", letter);
    } else {
      result += colorLetter("gray", letter);
    }
  });

  RESULT += `${result} \n\n`;
  console.log(RESULT);
}

function start(tries: number) {
  if (tries >= TRIES) {
    console.log("🤦  You lost");
    console.log("the pokemon was " + pokemon);
    return;
  }

  let aswer = "";
  while (aswer === "") {
    const { error, res }: any = question();
    if (error) {
      console.log(error);
      continue;
    }
    if (res) aswer = res;
  }

  if (aswer === pokemon) {
    print(aswer);
    console.log("🍕  you wont");
    console.log("You did it in " + (tries + 1) + " tries");
  } else {
    print(aswer);
    tries++;
    start(tries);
  }
}

console.log("welcome to this ╰(*°▽°*)╯");
console.log("Hint: The pokemon has " + pokemon.length + " characters");

start(0);
