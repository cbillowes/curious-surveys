export type Orchestration = {
  onStart?: () => void;
  onComplete?: () => void;
  onSuccess?: (data: unknown) => void;
  onFailure?: (message: string) => void;
  onError?: (message: string) => void;
};

export const withResponse = async (
  request: () => Promise<Response>,
  orchestration: Orchestration
): Promise<void> => {
  try {
    orchestration?.onStart?.();
    const result = await request();
    const data = await result.json();
    if (result.ok) {
      orchestration?.onSuccess?.(data);
    } else {
      const message = data.message || result.statusText;
      if (result.status >= 500) {
        orchestration?.onError?.("Something went wrong.");
      } else {
        orchestration?.onFailure?.(message);
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      orchestration?.onError?.(error.message);
    }
  } finally {
    orchestration?.onComplete?.();
  }
};
