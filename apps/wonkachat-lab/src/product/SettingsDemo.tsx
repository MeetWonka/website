import { useState } from "react";
import {
  ActionButton,
  Field,
  KnowledgeFiles,
  ProductDialog,
  SettingsPanel,
  SettingsWorkspace,
  defaultSettingsAccess,
} from "../../../../packages/product-ui/src";
import type {
  Member,
  ResourceRow,
  SaveState,
  SettingsTab,
} from "../../../../packages/product-ui/src";
import { members } from "./fixtures";
const initialResources: Partial<Record<SettingsTab, ResourceRow[]>> = {
  "api-keys": [
    {
      id: "key-demo",
      name: "Intégration CRM",
      detail: "•••• •••• DEMO · Créée le 23 septembre 2026",
      status: "Active",
    },
  ],
  files: [
    {
      id: "method",
      name: "Méthode commerciale.pdf",
      detail: "240 Ko · Ajouté le 24 septembre 2026",
      status: "Prêt",
    },
  ],
  memories: [
    {
      id: "tone",
      name: "Style de réponse",
      detail: "Privilégier des synthèses courtes, en français.",
    },
    {
      id: "context",
      name: "Contexte professionnel",
      detail: "Équipe commerciale · Préparation des rendez-vous clients.",
    },
  ],
  groups: [
    {
      id: "sales",
      name: "Équipe commerciale",
      detail: "3 membres · Accès aux agents de préparation client",
      status: "Actif",
    },
  ],
  tags: [
    { id: "client", name: "Relation client", detail: "3 agents" },
    { id: "ops", name: "Opérations", detail: "2 agents" },
  ],
  organizations: [
    {
      id: "demo",
      name: "Wonka Demo",
      detail: "example.com · 8 membres",
      status: "Active",
    },
  ],
  onboarding: [
    {
      id: "connectors",
      name: "Connecter vos outils",
      detail: "Outlook, Odoo et SharePoint sont connectés.",
      status: "Terminé",
    },
    {
      id: "agents",
      name: "Créer votre premier agent",
      detail: "Brief client est prêt à être configuré.",
      status: "Terminé",
    },
    {
      id: "templates",
      name: "Explorer les templates",
      detail: "70 modèles pour démarrer.",
      status: "À découvrir",
    },
  ],
  "tool-policies": [
    {
      id: "read",
      name: "Lecture des données",
      detail: "Outlook · Odoo · SharePoint",
      status: "Autorisée",
    },
    {
      id: "write",
      name: "Modification des données",
      detail: "Demander une confirmation avant chaque action.",
      status: "À confirmer",
    },
  ],
  subscription: [
    {
      id: "plan",
      name: "Espace équipe",
      detail: "Configuration de démonstration",
      value: "8 membres",
    },
  ],
  "my-stats": [
    {
      id: "brief",
      name: "Brief client",
      detail: "24 septembre · Outlook et Odoo",
      value: "18 conversations",
    },
  ],
  "org-stats": [
    {
      id: "sales",
      name: "Équipe commerciale",
      detail: "6 utilisateurs actifs",
      value: "96 conversations",
    },
    {
      id: "ops",
      name: "Opérations",
      detail: "2 utilisateurs actifs",
      value: "32 conversations",
    },
  ],
  "llm-ops": [
    {
      id: "run-1",
      name: "Préparation du rendez-vous Northstar",
      detail: "Brief client · 24 septembre, 09:00",
      status: "Terminé",
    },
    {
      id: "run-2",
      name: "Synthèse des opérations",
      detail: "SharePoint · 24 septembre, 08:30",
      status: "Terminé",
    },
  ],
};
export function SettingsDemo({
  onNavigate,
  onNotice,
  initialTab = "general",
}: {
  onNavigate: (page: "agents" | "connectors" | "templates") => void;
  onNotice: (text: string) => void;
  initialTab?: SettingsTab;
}) {
  const [tab, setTab] = useState<SettingsTab>(initialTab),
    [save, setSave] = useState<SaveState>("draft"),
    [people, setPeople] = useState(members),
    [resources, setResources] = useState(initialResources),
    [action, setAction] = useState(""),
    [entry, setEntry] = useState(""),
    [detail, setDetail] = useState(""),
    [role, setRole] = useState<Member["role"]>("Membre");
  const [values, setValues] = useState<Record<string, string | boolean>>({
    theme: "Clair",
    language: "Français",
    name: "Camille Martin",
    email: "camille@example.com",
    organization: "Wonka Demo",
    domain: "example.com",
    speechLanguage: "Français",
    voice: "Voix par défaut",
    orgLanguage: "Français",
    sessionDuration: "24 heures",
    policy: "Demander confirmation",
    plan: "Espace équipe",
    billing: "8 membres · Facturation de démonstration",
    conversations: "128",
    runs: "42",
    activeUsers: "8",
    showTools: true,
    markdown: true,
    enterSend: true,
    memory: true,
    systemPrompt:
      "Répondez en français. Distinguez les faits des hypothèses. Citez vos sources. Demandez confirmation avant toute action qui modifie des données.",
  });
  const [kind, id] = action.split(":");
  const row = resources[tab]?.find((r) => r.id === id);
  const destructive = [
    "Révoquer",
    "Supprimer",
    "Retirer",
    "clear-conversations",
  ].includes(kind);
  const titles: Record<string, string> = {
    invite: "Inviter un membre",
    "create-api-key": "Créer une clé API",
    "create-groups": "Créer un groupe",
    "create-tags": "Créer un tag",
    "create-organizations": "Créer une organisation",
    Modifier: "Modifier",
    Configurer: "Configurer la politique",
    Révoquer: "Révoquer la clé",
    Supprimer: "Supprimer cette mémoire",
    Retirer: "Retirer le fichier",
    "clear-conversations": "Supprimer les conversations",
    password: "Modifier le mot de passe",
    avatar: "Changer l’avatar",
    "upload-file": "Ajouter un fichier",
    import: "Importer les conversations",
    "manage-subscription": "Gérer l’abonnement",
  };
  const openAction = (a: string) => {
    if (a === "save-settings") {
      setSave("saved");
      onNotice("Paramètres enregistrés dans la démonstration.");
      return;
    }
    if (a === "export") {
      const blob = new Blob(
        [JSON.stringify({ demo: true, conversations: [] }, null, 2)],
        { type: "application/json" },
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "wonka-demo-conversations.json";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      onNotice("Export de démonstration téléchargé.");
      return;
    }
    const [next, nextId] = a.split(":");
    if (next === "Ouvrir") {
      onNavigate(nextId as "agents" | "connectors" | "templates");
      return;
    }
    const selected = resources[tab]?.find((r) => r.id === nextId);
    setEntry(selected?.name ?? "");
    setDetail(selected?.detail ?? "");
    setAction(a);
  };
  const confirm = () => {
    if (kind === "invite")
      setPeople((v) => [
        ...v,
        {
          id: `invite-${v.length}`,
          name: entry.split("@")[0],
          email: entry,
          role,
          status: "Invité",
        },
      ]);
    else if (destructive) {
      if (kind === "clear-conversations")
        setValues((v) => ({ ...v, conversations: "0" }));
      if (id)
        setResources((v) => ({
          ...v,
          [tab]: (v[tab] ?? []).filter((r) => r.id !== id),
        }));
    } else if (kind === "Modifier" || kind === "Configurer")
      setResources((v) => ({
        ...v,
        [tab]: (v[tab] ?? []).map((r) =>
          r.id === id ? { ...r, name: entry, detail } : r,
        ),
      }));
    else if (kind.startsWith("create-"))
      setResources((v) => ({
        ...v,
        [tab]: [
          ...(v[tab] ?? []),
          {
            id: `demo-${(v[tab] ?? []).length}`,
            name: entry,
            detail:
              kind === "create-api-key"
                ? "•••• •••• DEMO · Clé fictive"
                : detail,
            status: "Actif",
          },
        ],
      }));
    setSave("draft");
    setAction("");
    onNotice(
      kind === "invite"
        ? "Invitation simulée : aucun email envoyé."
        : kind === "password"
          ? "Demande de changement simulée."
          : "Modification appliquée dans la démonstration.",
    );
  };
  const fileAction =
    kind === "upload-file" || kind === "import" || kind === "avatar";
  const addFiles = (files: File[]) => {
    if (kind === "avatar") {
      const file = files[0];
      if (file && !file.type.startsWith("image/")) {
        onNotice("Choisissez une image pour l’avatar.");
        return;
      }
      if (file) {
        const reader = new FileReader();
        reader.onload = () =>
          setValues((v) => ({ ...v, avatar: String(reader.result) }));
        reader.readAsDataURL(file);
      }
    } else if (kind === "upload-file") {
      setResources((v) => ({
        ...v,
        files: [
          ...(v.files ?? []),
          ...files.map((f, i) => ({
            id: `file-${(v.files ?? []).length + i}`,
            name: f.name,
            detail: `${Math.ceil(f.size / 1024)} Ko`,
            status: "Prêt",
          })),
        ],
      }));
    }
    setAction("");
    onNotice(
      kind === "import"
        ? "Import simulé. Les fichiers ne sont pas envoyés."
        : "Fichier ajouté à la démonstration.",
    );
  };
  return (
    <>
      <SettingsWorkspace
        active={tab}
        onTabChange={(t) => {
          setTab(t);
          setSave("draft");
        }}
        access={{
          ...defaultSettingsAccess,
          orgAdmin: true,
          superAdmin: true,
          apiKeys: true,
          audit: true,
          subscription: true,
        }}
      >
        <SettingsPanel
          tab={tab}
          values={values}
          onChange={(k, v) => {
            setValues((x) => ({ ...x, [k]: v }));
            setSave("draft");
          }}
          state={save}
          canManage
          members={people}
          onRoleChange={(person, personRole) =>
            setPeople((v) =>
              v.map((m) => (m.id === person ? { ...m, role: personRole } : m)),
            )
          }
          resources={resources[tab] ?? []}
          onAction={openAction}
        />
      </SettingsWorkspace>
      <ProductDialog
        open={!!action}
        onClose={() => setAction("")}
        title={titles[kind] ?? "Paramètres"}
        description="Démonstration locale. Aucun compte externe ni donnée de production ne sera modifié."
      >
        <form
          className="wp-stack"
          onSubmit={(e) => {
            e.preventDefault();
            confirm();
          }}
        >
          {destructive ? (
            <p>
              {kind === "clear-conversations"
                ? "Les conversations de cet aperçu seront supprimées."
                : `Confirmez la suppression de « ${row?.name ?? "cet élément"} ».`}
            </p>
          ) : fileAction ? (
            <KnowledgeFiles files={[]} onAdd={addFiles} />
          ) : kind === "manage-subscription" ? (
            <>
              <h3>Espace équipe · 8 membres</h3>
              <p>
                Les changements de facturation se font depuis le portail de
                votre organisation. Cette maquette présente uniquement le
                récapitulatif.
              </p>
            </>
          ) : (
            <>
              <Field
                label={
                  kind === "invite"
                    ? "Adresse email"
                    : kind === "password"
                      ? "Nouveau mot de passe"
                      : "Nom"
                }
                required
              >
                <input
                  required
                  type={
                    kind === "invite"
                      ? "email"
                      : kind === "password"
                        ? "password"
                        : "text"
                  }
                  minLength={kind === "password" ? 8 : 1}
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                />
              </Field>
              {kind === "invite" ? (
                <Field label="Rôle">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as Member["role"])}
                  >
                    <option>Membre</option>
                    <option>Admin</option>
                  </select>
                </Field>
              ) : kind !== "password" && kind !== "create-api-key" ? (
                <Field label="Description">
                  <textarea
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                  />
                </Field>
              ) : null}
            </>
          )}
          <div className="wp-actions">
            <ActionButton onClick={() => setAction("")}>Annuler</ActionButton>
            {!fileAction && kind !== "manage-subscription" && (
              <ActionButton
                tone={destructive ? "danger" : "primary"}
                type="submit"
              >
                {kind === "invite"
                  ? "Inviter"
                  : destructive
                    ? "Confirmer"
                    : "Enregistrer"}
              </ActionButton>
            )}
          </div>
        </form>
      </ProductDialog>
    </>
  );
}
