declare global {
  type MaybePromise<T> = T | Promise<T>;
}

export {};
