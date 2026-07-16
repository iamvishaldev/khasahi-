import React from 'react';
import {ScreenScaffold} from '@/common/ui/ScreenScaffold';

export function HistoryScreen(): React.JSX.Element {
  return (
    <ScreenScaffold
      title="History"
      description="Scan history will use React Query for server state and MMKV for instant local recall."
    />
  );
}

