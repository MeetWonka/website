import { useState } from 'react';
import * as Select from '@ariakit/react/select';
import { LogOut } from 'lucide-react';
import { UserIcon } from '../primitives/icons';
import { cn } from '../../lib/utils';

/**
 * Ported from WonkaChat/client/src/components/Nav/AccountSettings.tsx —
 * `preview-feature/agent-creation-ux` branch. Re-ported alongside Nav.tsx's
 * full rebuild (see that file's doc comment for why this branch, not
 * `preview-feature/onboarding`, is the one to read). Markup/classNames kept
 * verbatim, including the `h-9 w-9 justify-center` (compact) vs `h-9 w-full`
 * sizing split on the trigger and the `avatarSeed.length === 0` fallback
 * check on the no-avatar circle.
 *
 * Stripped/mocked:
 * - `useAuthContext` (real user/logout) → a static mock user prop.
 * - `useAvatar` (Gravatar/avatar-URL resolution) → dropped; the mock user has
 *   no `avatar`, so this always renders the no-avatar fallback circle
 *   (real source: solid blue circle + `<UserIcon />`).
 * - `OrgAdminDropdown` (organization-admin-only menu items, gated behind org
 *   role checks via `useCurrentOrganization`) → out of scope, dropped
 *   entirely rather than faked; only the email line + logout item remain,
 *   which is what every non-admin account actually sees in production.
 */
interface MockUser {
  name?: string;
  email?: string;
}

export default function AccountSettings({
  compact = false,
  user = { name: 'Gabriel', email: 'gabriel@meetwonka.com' },
}: {
  compact?: boolean;
  user?: MockUser;
}) {
  const [imageError, setImageError] = useState(false);
  const avatarSeed = user?.name || '';

  return (
    <Select.SelectProvider>
      <Select.Select
        aria-label="Account settings"
        data-testid="nav-user"
        data-tour="account-settings"
        className={cn(
          'flex items-center overflow-hidden rounded-[var(--radius-sm)] text-sm text-text-secondary transition-colors duration-100 ease-out hover:bg-surface-hover hover:text-text-primary',
          compact ? 'h-9 w-9 justify-center' : 'h-9 w-full',
        )}
      >
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center">
          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center overflow-hidden rounded-full">
            {avatarSeed.length === 0 || imageError ? (
              <div
                style={{
                  backgroundColor: 'var(--color-blue-600)',
                  boxShadow: 'rgba(240, 246, 252, 0.1) 0px 0px 0px 1px',
                }}
                className="flex h-full w-full items-center justify-center rounded-full text-text-primary"
                aria-hidden="true"
              >
                <UserIcon />
              </div>
            ) : (
              <img
                className="h-full w-full rounded-full object-cover"
                src=""
                alt={`${user?.name ?? ''}'s avatar`}
                onError={() => setImageError(true)}
              />
            )}
          </div>
        </div>
        {!compact && (
          <div className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap pr-2 text-left text-[15px]">
            {user?.name ?? 'Account'}
          </div>
        )}
      </Select.Select>
      <Select.SelectPopover
        className={compact ? 'popover-ui z-[9999] w-[235px]' : 'popover-ui w-[235px]'}
        style={
          compact
            ? { transformOrigin: 'left top' }
            : { transformOrigin: 'bottom', marginRight: '0px', translate: '0px' }
        }
      >
        <div className="text-token-text-secondary ml-3 mr-2 py-2 text-sm" role="note">
          {user?.email ?? 'Account'}
        </div>
        <div className="-mx-1 my-1 h-px bg-border-medium" />
        <Select.SelectItem aria-selected value="logout" className="select-item text-sm">
          <LogOut className="icon-md h-4 w-4" />
          Log out
        </Select.SelectItem>
      </Select.SelectPopover>
    </Select.SelectProvider>
  );
}
