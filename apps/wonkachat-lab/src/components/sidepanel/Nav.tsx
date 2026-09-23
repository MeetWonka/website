import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronDown,
  ExternalLink,
  BotMessageSquare,
  PlugZap,
  Settings,
  Plus,
  Archive,
  SlidersHorizontal,
  MessageSquare,
  ScrollText,
  MessageSquareQuote,
  Folder,
  FolderPlus,
  Bookmark,
  Pin,
  PinOff,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../primitives/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../primitives/Dialog';
import { SidebarIcon, MobileSidebarIcon, NewChatIcon } from '../primitives/icons';
import AccountSettings from './AccountSettings';
import SidebarSearchInput from './SidebarSearchInput';
import {
  NavCollapsibleSection,
  NavNestedDisclosure,
  NavSubLink,
  COLLAPSED_NAV_ICON_CLASS,
  NAV_ICON_SLOT_CLASS,
  NAV_TRAILING_SLOT_CLASS,
  SECTION_ROW_CLASS,
} from './NavSections';
import { cn } from '../../lib/utils';
import type { MockAgent } from '../agents/AgentCard';

/**
 * Rebuilt from WonkaChat/client/src/components/Nav/Nav.tsx (+ NavSections.tsx,
 * AccountSettings.tsx, SidebarSearchInput.tsx, which live alongside it) — read
 * off `preview-feature/agent-creation-ux`, NOT `preview-feature/onboarding`
 * (the branch checked out in the main WonkaChat working directory when the
 * prior pass ran). Gabriel confirmed the nested-accordion nav he wants
 * (Agents → All/Pinned/Recent; Customize → Connectors/Skills/Prompts;
 * Conversations → History/Projects/Bookmarks) does exist — just on this other
 * branch, which the prior pass never checked because it was mid-checkout in
 * another git worktree. That branch was read exclusively via
 * `git show preview-feature/agent-creation-ux:<path>` from inside WonkaChat
 * (never checked out), so the main WonkaChat working tree was never touched.
 *
 * This replaces the previous version of this file, which was an accurate
 * port of `preview-feature/onboarding`'s flatter nav (no nested sections) —
 * that version's own doc comment explained, correctly for the branch it
 * checked, that no nested-accordion structure existed anywhere it looked.
 * It just hadn't looked here yet.
 *
 * Structure kept verbatim from the source:
 * - Three `NavCollapsibleSection`s (see `./NavSections.tsx`, ported
 *   alongside this file): "Agents" (icon `BotMessageSquare`), "Customize"
 *   (icon `SlidersHorizontal`), "Conversations" (icon `MessageSquare`) — each
 *   independently expandable, each collapsing to a single centered icon
 *   button when the whole rail is panel-collapsed to 64px.
 * - Inside "Agents": a `NavSubLink` "All agents" (+ a trailing "create
 *   agent" `+` button), then two `NavNestedDisclosure`s — "Pinned agents"
 *   and "Recent agents" — each with a `count` badge, each independently
 *   toggled, each listing agent rows with a small avatar-square + name.
 * - Inside "Customize": three `NavSubLink`s — Connectors / Skills / Prompts.
 * - Inside "Conversations": a `SidebarSearchInput` (full-width bordered
 *   search box, not an icon-that-widens — that was the prior pass's
 *   `onboarding`-branch behavior, dropped here), a "History"
 *   `NavNestedDisclosure` (conversation rows + "Show more" + an "Archived
 *   chats" `NavSubLink`), a "Projects" `NavNestedDisclosure` (expandable
 *   project rows with pin/new-chat actions revealed on hover, "New project"
 *   row), and a "Bookmarks" `NavNestedDisclosure` (toggleable tag rows).
 * - Bottom-pinned, below a divider: "Help & FAQ", "Settings", the
 *   `AccountSettings` user row — same `SECTION_ROW_CLASS`/
 *   `COLLAPSED_NAV_ICON_CLASS` treatment as the source, labels going
 *   `invisible w-0 overflow-hidden` (not unmounted) when panel-collapsed so
 *   the collapse itself doesn't reflow-jump.
 * - When panel-collapsed to 64px, clicking the "Conversations" icon pops a
 *   floating history-only panel out to the right of the rail (anchored via
 *   `buttonRef`), same as the source's `historyPanelOpen` — the only
 *   popout in the real nav (Projects/Bookmarks live *inside* Conversations
 *   now, unlike a much older, already-superseded lab pass that gave
 *   Projects its own separate collapsed icon+popup).
 *
 * Stripped/mocked, since this lab has no router/recoil/react-query/backend:
 * - `useLocalize` → static English strings.
 * - `useAuthContext`, `useCurrentOrganization`, `useHasAccess`,
 *   `useOrgFeature` → all access flags hardcoded to "everything visible";
 *   the organization header shows a mock name via a prop.
 * - `useConversationsInfiniteQuery` / `useAgentsMap` / `useFavoriteAgents` /
 *   `useNewConvo` / `useSelectAgent` / `useNavigateToAgentCreationChat` →
 *   replaced with local mock arrays and no-op handlers.
 * - `ProjectsSection.tsx` (its own file in the source — pin/rename/delete
 *   dialogs, paginated queries, inline per-project chat lists via
 *   `useConversationsInfiniteQuery`) → flattened into a single mocked
 *   `NavNestedDisclosure` here rather than ported as a separate file, since
 *   none of its data plumbing exists in this lab; hover-reveal pin/new-chat
 *   icon affordances are kept, their handlers are no-ops.
 * - `BookmarkSection.tsx` → ported faithfully but fed a mocked tag list
 *   instead of `useGetConversationTags()`.
 * - `ArchivedChatsTable` (a full paginated table in `OGDialog`) → a small
 *   mocked list in a `Dialog`, not the real table.
 * - `react-router-dom` `<Link>`s → plain buttons (see `NavSections.tsx`'s
 *   own doc comment); `collapsedTo` navigation is dropped, collapsed clicks
 *   just toggle the mocked "active" section for visual parity.
 */

export interface MockConversation {
  id: string;
  title: string;
}

export interface MockProject {
  id: string;
  name: string;
  pinned?: boolean;
  conversationCount: number;
  conversations: MockConversation[];
}

export interface MockBookmark {
  tag: string;
  count: number;
}

const NAV_WIDTH_DESKTOP = '272px';
const NAV_WIDTH_MOBILE = '320px';
const NAV_WIDTH_COLLAPSED = '64px';
const RECENT_CONVERSATION_LIMIT = 4;

const PRIMARY_NAV_INTERACTION_CLASS =
  'hover:!bg-[var(--ds-layout-sidebar-hover)] hover:!text-text-primary focus-visible:!bg-[var(--ds-layout-sidebar-hover)] focus-visible:!text-text-primary';
const PRIMARY_NAV_INACTIVE_CLASS = `text-text-secondary ${PRIMARY_NAV_INTERACTION_CLASS}`;
const PRIMARY_NAV_ACTIVE_CLASS =
  'border-border-medium bg-[var(--ds-layout-sidebar-hover)] text-text-primary';

const mockPinnedAgents: MockAgent[] = [
  { id: 'agent-1', name: 'Deal Desk' },
  { id: 'agent-2', name: 'Support Triage' },
];
const mockRecentAgents: MockAgent[] = [
  { id: 'agent-3', name: 'Release Notes Writer' },
  { id: 'agent-4', name: 'Onboarding Guide' },
  { id: 'agent-5', name: 'Contract Redliner' },
];
const mockConversations: MockConversation[] = [
  { id: 'c-1', title: 'Summarize the Q3 churn report' },
  { id: 'c-2', title: 'Draft onboarding email sequence' },
  { id: 'c-3', title: 'Compare vendor pricing tiers' },
  { id: 'c-4', title: 'Refactor auth middleware' },
  { id: 'c-5', title: 'Plan the Series A deck outline' },
  { id: 'c-6', title: 'Write the release notes for v2.4' },
];
const mockArchivedConversations: MockConversation[] = [
  { id: 'a-1', title: 'Legacy pricing model exploration' },
  { id: 'a-2', title: 'Q1 retro notes' },
];
const mockProjects: MockProject[] = [
  {
    id: 'proj-1',
    name: 'Q3 Renewals',
    pinned: true,
    conversationCount: 3,
    conversations: [
      { id: 'c-1', title: 'Summarize the Q3 churn report' },
      { id: 'c-3', title: 'Compare vendor pricing tiers' },
    ],
  },
  {
    id: 'proj-2',
    name: 'Series A Deck',
    conversationCount: 1,
    conversations: [{ id: 'c-5', title: 'Plan the Series A deck outline' }],
  },
];
const mockBookmarks: MockBookmark[] = [
  { tag: 'follow-up', count: 4 },
  { tag: 'important', count: 2 },
];

function AgentQuickItem({
  agent,
  onOpenAgent,
}: {
  agent: MockAgent;
  onOpenAgent: (agentId: string) => void;
}) {
  return (
    <li className="list-none">
      <button
        type="button"
        onClick={() => onOpenAgent(agent.id)}
        className="wonka-sidebar-nav-item flex h-8 w-full items-center gap-2 rounded-md px-1.5 text-left text-text-primary no-underline transition-colors hover:bg-[var(--ds-layout-sidebar-hover)]"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border-light bg-surface-secondary text-[10px] font-semibold text-text-secondary">
          {agent.name.slice(0, 1).toUpperCase()}
        </span>
        <span className="min-w-0 flex-1 truncate">{agent.name}</span>
      </button>
    </li>
  );
}

function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
  );
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const listener = () => setIsSmall(mql.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, []);
  return isSmall;
}

/** Real `Nav.tsx` persists section-open state via `useLocalStorage`; this lab
 * has no need to persist across reloads, so section state is plain in-memory
 * `useState` (the `key` arg is kept only so call-sites read identically to
 * the source's `useLocalStorage(key, default)` calls). */
function useMockLocalStorage<T>(_key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  return [value, setValue] as const;
}

interface NavProps {
  /** Storybook control: start the rail expanded or collapsed. */
  defaultNavVisible?: boolean;
  organizationName?: string;
}

export default function Nav({ defaultNavVisible = true, organizationName = 'gabriel' }: NavProps) {
  const [navVisible, setNavVisible] = useState(defaultNavVisible);
  const isSmallScreen = useIsSmallScreen();
  const [selectedAgentId, setSelectedAgentId] = useState('');
  const [visibleHistoryCount, setVisibleHistoryCount] = useState(RECENT_CONVERSATION_LIMIT);
  const [searchText, setSearchText] = useState('');
  const [archivesOpen, setArchivesOpen] = useState(false);

  const [agentsOpen, setAgentsOpen] = useMockLocalStorage('navAgentsOpen.v2', true);
  const [customizeOpen, setCustomizeOpen] = useMockLocalStorage('navCustomizeOpen.v2', false);
  const [conversationsOpen, setConversationsOpen] = useMockLocalStorage(
    'navConversationsOpen.v2',
    true,
  );
  const [pinnedAgentsOpen, setPinnedAgentsOpen] = useMockLocalStorage(
    'navPinnedAgentsOpen.v2',
    true,
  );
  const [recentAgentsOpen, setRecentAgentsOpen] = useMockLocalStorage('navRecentAgentsOpen', false);
  const [historyOpen, setHistoryOpen] = useMockLocalStorage('navHistoryOpen.v2', true);
  const [projectsOpen, setProjectsOpen] = useMockLocalStorage('navProjectsOpen.v2', true);
  const [bookmarksOpen, setBookmarksOpen] = useMockLocalStorage('navBookmarksOpen.v2', false);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>('proj-1');
  const [tags, setTags] = useState<string[]>([]);

  const [historyPanelOpen, setHistoryPanelOpen] = useState(false);
  const [historyPopupTop, setHistoryPopupTop] = useState(0);
  const historyButtonRef = useRef<HTMLButtonElement>(null);

  const isNewChatActive = true;
  const isAgentsActive = false;
  const isConnectorsActive = false;
  const isSkillsActive = false;
  const isPromptsActive = false;
  const isCustomizeActive = isConnectorsActive || isSkillsActive || isPromptsActive;
  const isSettingsActive = false;

  const toggleNavVisible = useCallback(() => {
    setNavVisible((prev) => !prev);
  }, []);

  const itemToggleNav = useCallback(() => {
    if (isSmallScreen) {
      toggleNavVisible();
    }
  }, [isSmallScreen, toggleNavVisible]);

  const toggleHistorySection = useCallback(() => {
    const isCollapsedDesktopNav = !navVisible && !isSmallScreen;
    if (isCollapsedDesktopNav) {
      if (!historyPanelOpen && historyButtonRef.current) {
        const rect = historyButtonRef.current.getBoundingClientRect();
        setHistoryPopupTop(rect.top);
      }
      setHistoryPanelOpen((prev) => !prev);
      return;
    }
    setConversationsOpen(!conversationsOpen);
  }, [navVisible, isSmallScreen, historyPanelOpen, conversationsOpen, setConversationsOpen]);

  useEffect(() => {
    if (navVisible) {
      setHistoryPanelOpen(false);
    }
  }, [navVisible]);

  const filteredConversations = useMemo(() => {
    if (!searchText.trim()) {
      return mockConversations;
    }
    const q = searchText.toLowerCase();
    return mockConversations.filter((c) => c.title.toLowerCase().includes(q));
  }, [searchText]);

  const recentConversations = useMemo(
    () =>
      searchText.trim() ? filteredConversations : filteredConversations.slice(0, visibleHistoryCount),
    [searchText, filteredConversations, visibleHistoryCount],
  );
  const hasMoreHistory = !searchText.trim() && visibleHistoryCount < filteredConversations.length;

  const showMoreHistory = useCallback(() => {
    setVisibleHistoryCount((current) => current + RECENT_CONVERSATION_LIMIT);
  }, []);

  const handleOpenAgent = useCallback(
    (agentId: string) => {
      setSelectedAgentId(agentId);
      itemToggleNav();
    },
    [itemToggleNav],
  );

  const toggleTag = useCallback((tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }, []);

  const isDesktopCollapsed = !navVisible && !isSmallScreen;
  const isLayoutCollapsed = isDesktopCollapsed;
  const navWidth = isSmallScreen ? NAV_WIDTH_MOBILE : NAV_WIDTH_DESKTOP;
  const collapsedNavWidth = isSmallScreen ? '0px' : NAV_WIDTH_COLLAPSED;
  const navStyleWidth = navVisible ? navWidth : collapsedNavWidth;
  const navStyleTransform = navVisible || !isSmallScreen ? 'translateX(0)' : 'translateX(-100%)';

  return (
    <div
      data-testid="nav"
      className={cn(
        'wonka-sidebar nav active max-w-[320px] flex-shrink-0 overflow-hidden transition-[width,transform] duration-200 ease-in-out',
        'md:max-w-[272px]',
        isDesktopCollapsed && 'overflow-visible',
      )}
      style={{ width: navStyleWidth, transform: navStyleTransform }}
    >
      <div className={cn('h-full', isLayoutCollapsed ? 'w-[64px]' : 'w-[320px] md:w-[272px]')}>
        <div className="flex h-full flex-col">
          <nav
            id="chat-history-nav"
            aria-label="Chat history"
            className="flex h-full flex-col gap-1 px-3.5 pb-3.5 pt-3.5"
          >
            <div className="flex shrink-0 flex-col gap-1">
              {/* Panel-collapse toggle + organization name */}
              <div className="flex h-9 items-center">
                <Button
                  size="icon"
                  variant="outline"
                  aria-label={isDesktopCollapsed ? 'Open sidebar' : 'Close sidebar'}
                  className="group h-9 w-9 rounded-[var(--radius-sm)] border-none bg-transparent p-1.5 text-text-secondary hover:bg-surface-hover"
                  onClick={toggleNavVisible}
                >
                  <SidebarIcon className="h-4 w-4 max-md:hidden" />
                  <MobileSidebarIcon className="m-1 inline-flex size-10 items-center justify-center md:hidden" />
                </Button>
                {!isLayoutCollapsed && organizationName && (
                  <div
                    role="group"
                    aria-label={`Organization: ${organizationName}`}
                    title={organizationName}
                    className="flex min-w-0 items-center rounded-lg px-1 py-1.5 text-sm text-text-secondary"
                  >
                    <span className="min-w-0 truncate font-medium text-text-primary" dir="auto">
                      {organizationName}
                    </span>
                  </div>
                )}
              </div>

              {/* New chat */}
              <button
                type="button"
                aria-label="New chat"
                className={cn(
                  isLayoutCollapsed ? COLLAPSED_NAV_ICON_CLASS : SECTION_ROW_CLASS,
                  isNewChatActive
                    ? cn(PRIMARY_NAV_ACTIVE_CLASS, PRIMARY_NAV_INTERACTION_CLASS)
                    : PRIMARY_NAV_INACTIVE_CLASS,
                )}
              >
                <span className={cn(!isLayoutCollapsed && NAV_ICON_SLOT_CLASS)}>
                  <span className="flex h-4 w-4 items-center justify-center">
                    <NewChatIcon className="h-4 w-4" />
                  </span>
                </span>
                {!isLayoutCollapsed && (
                  <span className="min-w-0 flex-1 truncate pr-2">New chat</span>
                )}
              </button>
            </div>

            <div className="hide-scrollbar flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain">
              {/* Agents */}
              <NavCollapsibleSection
                id="nav-agents"
                label="Agents"
                icon={<BotMessageSquare className="h-4 w-4" />}
                open={agentsOpen}
                onOpenChange={setAgentsOpen}
                collapsed={isLayoutCollapsed}
                onCollapsedClick={itemToggleNav}
                isActive={isAgentsActive}
              >
                <NavSubLink
                  label="All agents"
                  icon={<BotMessageSquare className="h-3.5 w-3.5" />}
                  isActive={isAgentsActive}
                  onClick={itemToggleNav}
                  trailing={
                    <button
                      type="button"
                      aria-label="New agent"
                      className={cn(
                        NAV_TRAILING_SLOT_CLASS,
                        'rounded-md text-text-tertiary transition-colors hover:bg-black/10 hover:text-text-primary dark:hover:bg-white/10',
                      )}
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  }
                />
                <NavNestedDisclosure
                  id="nav-pinned-agents"
                  title="Pinned agents"
                  open={pinnedAgentsOpen}
                  onOpenChange={setPinnedAgentsOpen}
                  count={mockPinnedAgents.length}
                >
                  <ul className="m-0 p-0">
                    {mockPinnedAgents.map((agent) => (
                      <AgentQuickItem key={agent.id} agent={agent} onOpenAgent={handleOpenAgent} />
                    ))}
                  </ul>
                </NavNestedDisclosure>
                <NavNestedDisclosure
                  id="nav-recent-agents"
                  title="Recent Agents"
                  open={recentAgentsOpen}
                  onOpenChange={setRecentAgentsOpen}
                  count={mockRecentAgents.length}
                >
                  <ul className="m-0 p-0">
                    {mockRecentAgents.map((agent) => (
                      <AgentQuickItem key={agent.id} agent={agent} onOpenAgent={handleOpenAgent} />
                    ))}
                  </ul>
                </NavNestedDisclosure>
              </NavCollapsibleSection>

              {/* Customize */}
              <NavCollapsibleSection
                id="nav-customize"
                label="Customize"
                icon={<SlidersHorizontal className="h-4 w-4" />}
                open={customizeOpen}
                onOpenChange={setCustomizeOpen}
                collapsed={isLayoutCollapsed}
                onCollapsedClick={itemToggleNav}
                isActive={isCustomizeActive}
              >
                <NavSubLink
                  label="Connectors"
                  icon={<PlugZap className="h-3.5 w-3.5" />}
                  isActive={isConnectorsActive}
                  onClick={itemToggleNav}
                />
                <NavSubLink
                  label="Skills"
                  icon={<ScrollText className="h-3.5 w-3.5" />}
                  isActive={isSkillsActive}
                  onClick={itemToggleNav}
                />
                <NavSubLink
                  label="Prompts"
                  icon={<MessageSquareQuote className="h-3.5 w-3.5" />}
                  isActive={isPromptsActive}
                  onClick={itemToggleNav}
                />
              </NavCollapsibleSection>

              {/* Conversations */}
              <NavCollapsibleSection
                id="nav-conversations"
                label="Conversations"
                icon={<MessageSquare className="h-4 w-4" />}
                open={conversationsOpen}
                onOpenChange={setConversationsOpen}
                collapsed={isLayoutCollapsed}
                onCollapsedClick={toggleHistorySection}
                isActive={isDesktopCollapsed && historyPanelOpen}
                buttonRef={historyButtonRef}
              >
                <SidebarSearchInput
                  value={searchText}
                  onValueChange={setSearchText}
                  onClear={() => setSearchText('')}
                  placeholder="Search conversations"
                  ariaLabel="Search conversations"
                  clearAriaLabel="Clear search"
                />
                <NavNestedDisclosure
                  id="nav-history"
                  title="History"
                  open={historyOpen}
                  onOpenChange={setHistoryOpen}
                  limitHeight={false}
                >
                  <ul className="m-0 space-y-0.5 p-0">
                    {recentConversations.map((conversation) => (
                      <li key={conversation.id} className="list-none">
                        <button
                          type="button"
                          className="wonka-sidebar-nav-item flex h-8 w-full items-center gap-2 rounded-lg px-1.5 text-left text-text-primary transition-colors hover:bg-[var(--ds-layout-sidebar-hover)]"
                        >
                          <span className="min-w-0 flex-1 truncate">{conversation.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  {hasMoreHistory && (
                    <button
                      type="button"
                      onClick={showMoreHistory}
                      className="wonka-sidebar-nav-item mx-1 mb-1 flex h-8 items-center justify-center gap-1 rounded-lg text-text-secondary transition-colors hover:bg-[var(--ds-layout-sidebar-hover)] hover:text-text-primary"
                    >
                      Show more
                      <ChevronDown className="h-3 w-3" aria-hidden="true" />
                    </button>
                  )}
                  <NavSubLink
                    label="Archived chats"
                    icon={<Archive className="h-3.5 w-3.5" />}
                    onClick={() => setArchivesOpen(true)}
                  />
                </NavNestedDisclosure>

                {!searchText.trim() && (
                  <NavNestedDisclosure
                    id="nav-projects"
                    title="Projects"
                    open={projectsOpen}
                    onOpenChange={setProjectsOpen}
                    trailing={
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          aria-label="New project"
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-secondary outline-none transition-colors hover:bg-surface-active-alt hover:text-text-primary"
                        >
                          <FolderPlus className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    }
                  >
                    <ul className="m-0 list-none p-0">
                      {mockProjects.map((project) => {
                        const expanded = expandedProjectId === project.id;
                        return (
                          <li key={project.id} className="list-none">
                            <div className="group/project-row relative flex h-9 items-center rounded-lg text-sm text-text-primary transition-colors hover:bg-surface-active-alt">
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedProjectId(expanded ? null : project.id)
                                }
                                aria-expanded={expanded}
                                className="flex min-w-0 flex-1 items-center gap-1.5 rounded-lg py-1.5 pl-1.5 pr-16 text-left outline-none"
                              >
                                <ChevronRight
                                  className={cn(
                                    'h-3.5 w-3.5 shrink-0 text-text-secondary transition-transform duration-200',
                                    expanded && 'rotate-90',
                                  )}
                                  aria-hidden="true"
                                />
                                <Folder className="h-4 w-4 shrink-0 text-text-secondary" aria-hidden="true" />
                                <span className="truncate">{project.name}</span>
                              </button>
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute right-2 text-xs tabular-nums text-text-tertiary transition-opacity group-hover/project-row:opacity-0"
                              >
                                {project.conversationCount}
                              </span>
                              <div className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center gap-0.5 rounded-md bg-surface-active-alt opacity-0 transition-opacity group-hover/project-row:opacity-100">
                                <button
                                  type="button"
                                  aria-label={project.pinned ? 'Unpin project' : 'Pin project'}
                                  aria-pressed={project.pinned}
                                  className={cn(
                                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-secondary outline-none transition-colors hover:bg-surface-active-alt hover:text-text-primary',
                                    project.pinned && 'bg-surface-active-alt text-text-primary',
                                  )}
                                >
                                  {project.pinned ? (
                                    <PinOff className="h-3.5 w-3.5" aria-hidden="true" />
                                  ) : (
                                    <Pin className="h-3.5 w-3.5" aria-hidden="true" />
                                  )}
                                </button>
                              </div>
                            </div>
                            {expanded && (
                              <div>
                                {project.conversations.map((conversation) => (
                                  <button
                                    key={conversation.id}
                                    type="button"
                                    className="wonka-sidebar-nav-item flex h-8 w-full items-center gap-2 rounded-lg px-1.5 pl-7 text-left text-text-primary transition-colors hover:bg-[var(--ds-layout-sidebar-hover)]"
                                  >
                                    <span className="min-w-0 flex-1 truncate">
                                      {conversation.title}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </li>
                        );
                      })}
                      <li className="list-none">
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-text-secondary outline-none transition-colors hover:bg-surface-hover hover:text-text-primary"
                        >
                          <FolderPlus className="h-4 w-4 shrink-0" aria-hidden="true" />
                          <span className="truncate">New project</span>
                        </button>
                      </li>
                    </ul>
                  </NavNestedDisclosure>
                )}

                {!searchText.trim() && (
                  <NavNestedDisclosure
                    id="nav-bookmarks"
                    title="Bookmarks"
                    open={bookmarksOpen}
                    onOpenChange={setBookmarksOpen}
                  >
                    {mockBookmarks.length === 0 ? (
                      <p className="wonka-sidebar-nav-item px-1.5 py-1.5 text-text-tertiary">
                        No bookmarks yet
                      </p>
                    ) : (
                      <ul className="m-0 space-y-0.5 p-0">
                        {tags.length > 0 && (
                          <li className="list-none">
                            <button
                              type="button"
                              onClick={() => setTags([])}
                              className="wonka-sidebar-nav-item flex h-8 w-full items-center rounded-lg px-1.5 text-left text-text-secondary transition-colors hover:bg-[var(--ds-layout-sidebar-hover)] hover:text-text-primary"
                            >
                              Clear all
                            </button>
                          </li>
                        )}
                        {mockBookmarks.map((bookmark) => {
                          const selected = tags.includes(bookmark.tag);
                          return (
                            <li key={bookmark.tag} className="list-none">
                              <button
                                type="button"
                                onClick={() => toggleTag(bookmark.tag)}
                                className={cn(
                                  'wonka-sidebar-nav-item flex h-8 w-full items-center gap-2 rounded-lg px-1.5 text-left transition-colors',
                                  selected
                                    ? 'bg-[var(--ds-layout-sidebar-hover)] text-text-primary'
                                    : 'text-text-secondary hover:bg-[var(--ds-layout-sidebar-hover)] hover:text-text-primary',
                                )}
                              >
                                <Bookmark
                                  className="h-4 w-4 shrink-0"
                                  aria-hidden="true"
                                  fill={selected ? 'currentColor' : 'none'}
                                />
                                <span className="min-w-0 flex-1 truncate">{bookmark.tag}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </NavNestedDisclosure>
                )}
              </NavCollapsibleSection>
            </div>

            {/* Bottom-pinned: Help & FAQ, Settings, Account */}
            <div className="mt-2 flex shrink-0 flex-col gap-1 border-t border-border-medium pt-2">
              <button
                type="button"
                aria-label="Help & FAQ"
                className={cn(
                  isLayoutCollapsed ? COLLAPSED_NAV_ICON_CLASS : SECTION_ROW_CLASS,
                  PRIMARY_NAV_INACTIVE_CLASS,
                )}
              >
                <span className={cn(!isLayoutCollapsed && NAV_ICON_SLOT_CLASS)}>
                  <span className="flex h-4 w-4 items-center justify-center">
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </span>
                {!isLayoutCollapsed && (
                  <span className="min-w-0 flex-1 truncate pr-2">Help & FAQ</span>
                )}
              </button>
              <button
                type="button"
                aria-label="Settings"
                className={cn(
                  isLayoutCollapsed ? COLLAPSED_NAV_ICON_CLASS : SECTION_ROW_CLASS,
                  isSettingsActive
                    ? cn(PRIMARY_NAV_ACTIVE_CLASS, PRIMARY_NAV_INTERACTION_CLASS)
                    : PRIMARY_NAV_INACTIVE_CLASS,
                )}
              >
                <span className={cn(!isLayoutCollapsed && NAV_ICON_SLOT_CLASS)}>
                  <span className="flex h-4 w-4 items-center justify-center">
                    <Settings className="h-4 w-4" />
                  </span>
                </span>
                {!isLayoutCollapsed && (
                  <span className="min-w-0 flex-1 truncate pr-2">Settings</span>
                )}
              </button>
              <AccountSettings compact={isLayoutCollapsed} />
            </div>
          </nav>
        </div>
      </div>

      {/* History dropdown popup — anchored to the Conversations button, shown
          only when the rail is collapsed to its 64px icon-only state. */}
      {historyPanelOpen && !navVisible && !isSmallScreen && (
        <>
          <div className="fixed inset-0 z-[63]" onClick={() => setHistoryPanelOpen(false)} />
          <div
            className="fixed z-[65] w-[268px] overflow-hidden rounded-xl border border-border-light bg-surface-primary-alt shadow-2xl"
            style={{ left: '64px', top: historyPopupTop }}
          >
            <div className="px-3 pb-2 pt-3">
              <SidebarSearchInput
                value={searchText}
                onValueChange={setSearchText}
                onClear={() => setSearchText('')}
                placeholder="Search conversations"
                ariaLabel="Search conversations"
                clearAriaLabel="Clear search"
              />
            </div>
            <div
              className="flex flex-col px-2 pb-2"
              style={{ height: `min(480px, calc(100vh - ${historyPopupTop}px - 80px))` }}
            >
              <ul className="m-0 space-y-0.5 overflow-y-auto p-0">
                {filteredConversations.map((conversation) => (
                  <li key={conversation.id} className="list-none">
                    <button
                      type="button"
                      className="wonka-sidebar-nav-item flex h-9 w-full items-center gap-2 rounded-lg px-1.5 text-left text-text-primary transition-colors hover:bg-[var(--ds-layout-sidebar-hover)]"
                    >
                      <span className="min-w-0 flex-1 truncate">{conversation.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      {/* Archived chats — real source uses `ArchivedChatsTable` (paginated,
          restore/delete actions) inside an `OGDialog`; mocked here as a
          small static list in this lab's own `Dialog` primitive. */}
      <Dialog open={archivesOpen} onOpenChange={setArchivesOpen}>
        <DialogContent className="max-w-[560px]">
          <DialogHeader>
            <DialogTitle>Archived chats</DialogTitle>
          </DialogHeader>
          <ul className="m-0 space-y-0.5 px-6 pb-2 p-0">
            {mockArchivedConversations.map((conversation) => (
              <li key={conversation.id} className="list-none">
                <div className="flex h-9 w-full items-center gap-2 rounded-lg px-1.5 text-sm text-text-primary">
                  <span className="min-w-0 flex-1 truncate">{conversation.title}</span>
                </div>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}
