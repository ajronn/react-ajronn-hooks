/**
 * A custom React hook that checks if an object satisfies a given contract.
 *
 * @template T - The type of the object to check.
 * @param {T} value - The object to check.
 * @param {{ [K in keyof T]: (value: T[K]) => boolean }} contract - The contract that the object must satisfy.
 * @returns {{ checkContract: () => boolean }} An object containing a function that checks if the object satisfies the contract.
 */
export const contractValidator = <T extends Record<string, unknown>>(
  value: T,
  contract: { [K in keyof T]: (value: T[K]) => boolean }
): { checkContract: () => boolean } => {
  /**
   * Checks if the object satisfies the contract.
   *
   * @returns {boolean} True if the object satisfies the contract, false otherwise.
   */
  const checkContract = () => {
    return Object.keys(contract).every((key) => {
      const validationFn = contract[key as keyof T];
      const propValue = value[key as keyof T];
      const check = validationFn(propValue as T[keyof T]);
      if (!check) {
        console.error(`Invalid key %c${key}%c in contract`, "color: blue;", "");
      }
      return check;
    });
  };

  return { checkContract };
};
