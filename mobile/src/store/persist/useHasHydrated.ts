import {useEffect, useState} from 'react';

type PersistApi = {
  hasHydrated: () => boolean;
  onFinishHydration: (listener: () => void) => () => void;
};

export function useHasHydrated(persistApi: PersistApi): boolean {
  const [hasHydrated, setHasHydrated] = useState(persistApi.hasHydrated());

  useEffect(() => {
    if (hasHydrated) {
      return undefined;
    }
    return persistApi.onFinishHydration(() => setHasHydrated(true));
  }, [hasHydrated, persistApi]);

  return hasHydrated;
}
