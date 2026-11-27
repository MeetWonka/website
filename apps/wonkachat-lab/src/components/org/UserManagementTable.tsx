import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { durations } from '../../motion-tokens';

/**
 * Ported (in reduced form) from WonkaChat/custom/components/UserManagement.jsx
 * — a ~3000-line component covering members, invitations, billing, and usage
 * limits, driven entirely by `fetch()` calls against the org-management API.
 * This keeps the piece with real interaction/motion potential — the unified
 * members+invitations table with sortable column headers (verbatim
 * `cycleSortOrder`/`ColumnHeader` pattern, including the multi-column sort
 * index badge) and the send-invitation flow — and drops billing/usage/limits
 * entirely (out of scope per this lab's README), replacing every network
 * call with an in-memory mock roster.
 *
 * Corrected in this pass: the role control is a **native `<select>`** in the
 * real source, not a Radix `DropdownMenu` — a prior pass here had invented a
 * `RoleDropdown` built on `@radix-ui/react-dropdown-menu` with its own
 * framer-motion open/close animation; that's been reverted. The real table
 * only lets you change email/role via row-level "Edit" (which reveals a
 * plain `<select>`), so role and status render as static pill `<span>`s the
 * rest of the time — exact classes below (`bg-surface-active`/
 * `text-text-primary` for admin+active, `bg-gray-100`/`text-gray-800` for
 * member, `bg-yellow-100`/`text-yellow-800` for a pending invitation).
 * `useLocalize` → static English strings; `useMediaQuery` (responsive
 * `isSmallScreen` column density) and the usage/limit columns are dropped.
 */
type Role = 'ADMIN' | 'USER';
type ItemType = 'ACTIVE' | 'INVITATION';

interface RosterItem {
  id: string;
  type: ItemType;
  displayName?: string;
  displayEmail: string;
  displayRole: Role;
  displayDate: string;
  status?: 'pending';
}

const initialRoster: RosterItem[] = [
  { id: '1', type: 'ACTIVE', displayName: 'Gabriel', displayEmail: 'gabriel@meetwonka.com', displayRole: 'ADMIN', displayDate: '2026-01-12' },
  { id: '2', type: 'ACTIVE', displayName: 'Léa', displayEmail: 'lea@meetwonka.com', displayRole: 'USER', displayDate: '2026-02-03' },
  { id: '3', type: 'ACTIVE', displayName: 'Marco', displayEmail: 'marco@meetwonka.com', displayRole: 'USER', displayDate: '2026-03-21' },
  { id: '4', type: 'INVITATION', displayEmail: 'priya@partner.io', displayRole: 'USER', displayDate: '2026-09-01', status: 'pending' },
];

/** Ported verbatim from the source (`SORT_COLUMNS`), minus the `usage`/`limit` columns, which are out of scope. */
const SORT_COLUMNS: Array<{ field: SortField; label: string; sortable: boolean }> = [
  { field: 'type', label: 'Type', sortable: true },
  { field: 'email', label: 'User / Email', sortable: true },
  { field: 'role', label: 'Role', sortable: true },
  { field: 'date', label: 'Date', sortable: true },
];

type SortField = 'type' | 'email' | 'role' | 'date';
type SortEntry = { field: SortField; direction: 'asc' | 'desc' };

/** Ported verbatim from the source. */
function cycleSortOrder(current: SortEntry[], field: SortField): SortEntry[] {
  const idx = current.findIndex((s) => s.field === field);
  if (idx === -1) return [...current, { field, direction: 'asc' }];
  if (current[idx].direction === 'asc') {
    return current.map((s, i) => (i === idx ? { ...s, direction: 'desc' } : s));
  }
  return current.filter((s) => s.field !== field);
}

/** Ported verbatim from the source, including the multi-sort index badge. */
function ColumnHeader({
  field,
  label,
  sortable,
  sortOrder,
  onSort,
}: {
  field: SortField;
  label: string;
  sortable: boolean;
  sortOrder: SortEntry[];
  onSort: (field: SortField) => void;
}) {
  const thClass = 'px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-text-secondary';
  if (!sortable) {
    return <th className={thClass}>{label}</th>;
  }
  const index = sortOrder.findIndex((s) => s.field === field);
  const isActive = index !== -1;
  const direction = isActive ? sortOrder[index].direction : null;
  return (
    <th className={thClass}>
      <button
        type="button"
        onClick={() => onSort(field)}
        className="inline-flex items-center gap-1 uppercase tracking-wide hover:text-text-primary focus:outline-none"
      >
        <span>{label}</span>
        {isActive && direction === 'asc' && <ArrowUp className="h-3 w-3" />}
        {isActive && direction === 'desc' && <ArrowDown className="h-3 w-3" />}
        {!isActive && <ArrowUpDown className="h-3 w-3 opacity-50" />}
        {isActive && (
          <span className="ml-0.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-surface-active px-1 text-[10px] font-semibold text-text-primary">
            {index + 1}
          </span>
        )}
      </button>
    </th>
  );
}

function RolePill({ role }: { role: Role }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
        role === 'ADMIN' ? 'bg-surface-active text-text-primary' : 'bg-gray-100 text-gray-800'
      }`}
    >
      {role === 'ADMIN' ? 'Admin' : 'Member'}
    </span>
  );
}

export default function UserManagementTable() {
  const [roster, setRoster] = useState<RosterItem[]>(initialRoster);
  const [sortOrder, setSortOrder] = useState<SortEntry[]>([]);
  const [showSendInviteRow, setShowSendInviteRow] = useState(false);
  const [newInviteEmail, setNewInviteEmail] = useState('');
  const [newInviteRole, setNewInviteRole] = useState<Role>('USER');
  const [sendingInvite, setSendingInvite] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState<Role>('USER');

  const handleSort = (field: SortField) => setSortOrder((prev) => cycleSortOrder(prev, field));

  const sorted = [...roster].sort((a, b) => {
    for (const { field, direction } of sortOrder) {
      const av = field === 'type' ? a.type : field === 'role' ? a.displayRole : field === 'date' ? a.displayDate : a.displayEmail;
      const bv = field === 'type' ? b.type : field === 'role' ? b.displayRole : field === 'date' ? b.displayDate : b.displayEmail;
      const cmp = String(av).localeCompare(String(bv));
      if (cmp !== 0) return direction === 'asc' ? cmp : -cmp;
    }
    return 0;
  });

  function handleSendInvitation() {
    if (!newInviteEmail.trim()) return;
    setSendingInvite(true);
    setTimeout(() => {
      setRoster((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: 'INVITATION',
          displayEmail: newInviteEmail.trim(),
          displayRole: newInviteRole,
          displayDate: new Date().toISOString(),
          status: 'pending',
        },
      ]);
      setSendingInvite(false);
      setShowSendInviteRow(false);
      setNewInviteEmail('');
      setNewInviteRole('USER');
    }, 700);
  }

  function startEdit(item: RosterItem) {
    setEditingId(item.id);
    setEditRole(item.displayRole);
  }

  function saveEdit(id: string) {
    setRoster((prev) => prev.map((x) => (x.id === id ? { ...x, displayRole: editRole } : x)));
    setEditingId(null);
  }

  return (
    <div className="w-full max-w-3xl rounded-lg border border-border-light bg-surface-primary">
      <div className="flex items-center justify-between border-b border-border-light px-4 py-3">
        <h2 className="text-sm font-semibold text-text-primary">Members</h2>
        <button
          type="button"
          onClick={() => {
            setShowSendInviteRow((v) => !v);
            if (!showSendInviteRow) {
              setNewInviteEmail('');
              setNewInviteRole('USER');
            }
          }}
          className={`whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium text-white transition-colors ${
            showSendInviteRow ? 'bg-gray-500 hover:bg-gray-600' : 'bg-surface-submit hover:bg-surface-submit-hover'
          }`}
        >
          {showSendInviteRow ? 'Cancel' : '+ Send invitation'}
        </button>
      </div>

      {/*
        The real source renders this box with a plain conditional (no
        enter/exit animation at all) — the slide-down here is a deliberate
        ADDED embellishment for this motion lab, not a reproduction of
        existing source behavior.
      */}
      <AnimatePresence initial={false}>
        {showSendInviteRow && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={durations.standard}
            className="overflow-hidden"
          >
            <div className="mx-4 mb-4 mt-4 rounded-lg border-2 border-green-500 bg-surface-secondary p-4 dark:border-green-600">
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
                <div className="lg:col-span-2">
                  <input
                    type="email"
                    placeholder="Email address (e.g., john@company.com)"
                    value={newInviteEmail}
                    onChange={(e) => setNewInviteEmail(e.target.value)}
                    className="w-full rounded border border-green-300 bg-surface-primary px-3 py-2 text-sm text-text-primary focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-green-600 dark:focus:border-green-400 dark:focus:ring-green-400"
                  />
                </div>
                <div className="lg:col-span-1">
                  <select
                    value={newInviteRole}
                    onChange={(e) => setNewInviteRole(e.target.value as Role)}
                    className="w-full rounded border border-green-300 bg-surface-primary px-3 py-2 text-sm text-text-primary focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-green-600 dark:focus:border-green-400 dark:focus:ring-green-400"
                  >
                    <option value="USER">Member</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <div className="lg:col-span-1">
                  <button
                    onClick={handleSendInvitation}
                    disabled={sendingInvite}
                    className="w-full rounded bg-surface-submit px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-surface-submit-hover disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {sendingInvite ? 'Sending…' : 'Send invitation'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border-light bg-surface-secondary">
            <tr>
              {SORT_COLUMNS.map((col) => (
                <ColumnHeader
                  key={col.field}
                  field={col.field}
                  label={col.label}
                  sortable={col.sortable}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              ))}
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-text-secondary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            <AnimatePresence initial={false}>
              {sorted.map((item) =>
                item.type === 'ACTIVE' ? (
                  <motion.tr
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={durations.standard}
                    className="hover:bg-surface-hover"
                  >
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-surface-active px-2 py-1 text-xs font-medium text-text-primary">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-text-primary">{item.displayName ?? 'N/A'}</span>
                        <span className="text-xs text-text-secondary">{item.displayEmail}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {editingId === item.id ? (
                        <select
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value as Role)}
                          className="rounded border border-border-medium bg-surface-secondary px-2 py-1 text-xs text-text-primary focus:border-[var(--color-blue-600)] focus:outline-none"
                        >
                          <option value="USER">Member</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      ) : (
                        <RolePill role={item.displayRole} />
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary">
                      {new Date(item.displayDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        {editingId === item.id ? (
                          <>
                            <button
                              onClick={() => saveEdit(item.id)}
                              className="rounded px-2 py-1 text-xs font-medium text-green-600 hover:bg-green-50"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="rounded px-2 py-1 text-xs font-medium text-text-secondary hover:bg-surface-hover"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(item)}
                              className="rounded px-2 py-1 text-xs font-medium text-surface-submit hover:bg-surface-submit/10"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setRoster((prev) => prev.filter((x) => x.id !== item.id))}
                              className="rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ) : (
                  <motion.tr
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={durations.standard}
                    className="hover:bg-surface-hover"
                  >
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                        Pending
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-text-primary">{item.displayEmail}</div>
                    </td>
                    <td className="px-4 py-3">
                      <RolePill role={item.displayRole} />
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary">
                      {new Date(item.displayDate).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setRoster((prev) => prev.filter((x) => x.id !== item.id))}
                        className="rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Cancel invite
                      </button>
                    </td>
                  </motion.tr>
                ),
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
