export type ViewState = "ready" | "loading" | "empty" | "error" | "disabled";
export type SaveState = "draft" | "saving" | "saved" | "error";
export type ConnectionState =
  | "disconnected"
  | "configuring"
  | "authorizing"
  | "connecting"
  | "connected"
  | "error"
  | "expired";
export interface Connector {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  state: ConnectionState;
  favorite?: boolean;
  managed?: boolean;
  consumeOnly?: boolean;
  tags?: string[];
}
export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tags?: string[];
  instructions?: string;
  model: string;
  provider: string;
  tools: string[];
  mcp: string[];
  mcpServerNames?: string[];
  capabilities: { artifacts: string; conversation_starters: string[] };
  avatar: { filepath: string; source: string } | null;
  templateMeta?: {
    imageUrl?: string | null;
    videoUrl?: string | null;
    featured?: boolean;
    featuredOrder?: number;
  };
  translations?: {
    title: Record<string, string>;
    description: Record<string, string>;
  };
}
export interface Skill {
  id: string;
  name: string;
  description: string;
  instructions: string;
  enabled: boolean;
}
export interface KnowledgeFile {
  id: string;
  name: string;
  size: string;
  state: "uploading" | "ready" | "error";
  progress?: number;
}
export interface AgentDraft {
  id: string;
  name: string;
  description: string;
  instructions: string;
  model: string;
  tools: string[];
  skills: string[];
  starters: string[];
  files: KnowledgeFile[];
  capabilities: { artifacts: boolean; web: boolean; code: boolean };
}
export type BuilderSectionId =
  | "basics"
  | "model"
  | "behavior"
  | "conversation"
  | "knowledge"
  | "tools"
  | "schedule"
  | "advanced";
export interface Member {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Membre";
  status: "Actif" | "Invité";
}
export interface PermissionGrant {
  id: string;
  name: string;
  kind: "person" | "team";
  role: "use" | "edit";
  selected: boolean;
}
export interface ExecutionStep {
  id: string;
  name: string;
  source: string;
  state: "pending" | "running" | "complete" | "error";
  detail?: string;
}
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: { id: string; label: string; excerpt: string }[];
}
