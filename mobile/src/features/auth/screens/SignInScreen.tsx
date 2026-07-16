import React from 'react';
import {ScreenScaffold} from '@/common/ui/ScreenScaffold';

export function SignInScreen(): React.JSX.Element {
  return (
    <ScreenScaffold
      title="Sign in"
      description="Authentication UI will connect to Supabase Auth through a dedicated feature module."
    />
  );
}

