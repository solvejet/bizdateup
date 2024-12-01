// src/lib/utils/retry.ts
export async function retry<T>(
    fn: () => Promise<T>,
    retriesLeft = 3,
    interval = 1000
  ): Promise<T> {
    try {
      return await fn()
    } catch (error) {
      if (retriesLeft === 0) {
        throw error
      }
      await new Promise(resolve => setTimeout(resolve, interval))
      return retry(fn, retriesLeft - 1, interval)
    }
  }