/**
 * Finds and replaces four consecutive instances of the same lowercase character, with three of the character type.
 *
 * Explanation:
 * Utilizing regex, we can create capture groups to identify any occurence of four consecutive lowercase characters.
 * After matching against the pattern, we iterate over all the results and mutate the input.
 *
 * Time complexity: O(n2)
 * Space complexity: O(n)
 *
 * @param str A string, e.g "ffdttttyy".
 * @returns A formatted string, e.g input "ffdttttyy" will return "ffdtttyy".
 */
const removeIdenticalLetters = (str: string): string => {
  const matches = str.matchAll(/([a-z])\1{3}/g);

  for (const [chunk] of matches) {
    str = str.replace(chunk, chunk.slice(0, 3));
  }

  return str;
};

/**
 * Finds the highest possible sum of two numbers that forms an odd number.
 *
 * Explanation:
 * The way this works is that we sort the array first in a descending order,
 * then we start a loop and assign the first iteration to a variable,
 * consecutive loops will get the sum of the assigned variable and the current iteration,
 * if it's odd - then we found the highest possible combination that creates an odd number.
 *
 * Time complexity: O(n * log n)
 * Space complexity: O(n)
 *
 * @param numbers An array of numbers.
 * @returns The maximum amount of odd numbers, e.g input [19, 2, 42, 18] returns 61, if nothing was found the return value is -1.
 */
const maximumOddSum = (numbers: number[]): number => {
  const sortedNumbers = numbers.sort((a, b) => b - a);

  let maxOddSum = 0;

  for (const num of sortedNumbers) {
    if (maxOddSum === 0) {
      maxOddSum = num;
      continue;
    }

    const sum = num + maxOddSum;
    const isOdd = sum % 2 !== 0;

    if (isOdd) {
      return sum;
    }
  }

  return -1;
};

export { maximumOddSum, removeIdenticalLetters };
