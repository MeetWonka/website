$ErrorActionPreference = "Stop"
$Wip = "wip/marketing-overhaul-all"
$Base = "origin/main"
$GN = "Gabriel"
$GE = "96132604+Caezarr@users.noreply.github.com"

function Commit-Branch {
  param([string]$Branch, [string[]]$Paths, [string[]]$Remove, [string]$Msg)
  git checkout -B $Branch $Base | Out-Null
  if ($Paths) { git checkout $Wip -- @Paths 2>$null }
  foreach ($r in $Remove) {
    if (Test-Path $r) { git rm -f -- $r 2>$null }
  }
  git add -A
  $n = (git diff --cached --name-only | Measure-Object).Count
  if ($n -eq 0) { Write-Host "SKIP $Branch"; return $false }
  git -c "user.name=$GN" -c "user.email=$GE" commit -m $Msg | Out-Null
  Write-Host "OK $Branch ($n files)"
  git push -u origin $Branch --force-with-lease
  return $true
}

$PRs = @(
  @{
    Branch = "feat/nav-mega-menu"
    Msg = "feat: mega menu nav with disabled links and hidden locale switch"
    Paths = @(
      "src/lib/nav-defaults.ts","src/lib/nav-active.ts","src/lib/footer-nav.ts",
      "src/components/layout/mega-menu-panel.tsx","src/components/layout/header.tsx",
      "src/components/layout/desktop-nav.tsx","src/components/layout/mobile-nav.tsx",
      "src/components/layout/footer.tsx","src/components/layout/footer-link.tsx",
      "src/components/layout/language-switcher.tsx","src/lib/types/index.ts"
    )
    Remove = @(
      "src/components/layout/desktop-nav-dropdown.tsx",
      "src/components/layout/desktop-nav-link.tsx"
    )
  },
  @{
    Branch = "feat/workspace-ai-chat-page"
    Msg = "feat: workspace AI Chat page with capability grid"
    Paths = @(
      "src/app/(main-light)/layout.tsx",
      "src/app/(main-light)/workspace/ai-chat/page.tsx",
      "src/components/sections/capability-grid.tsx",
      "src/lib/page-defaults/ai-chat-capability-grid.ts",
      "src/components/sections/workspace-trial-cta.tsx",
      "sanity/schemas/objects/capabilityGridCard.ts",
      "sanity/schemas/objects/capabilityGridCluster.ts",
      "public/images/wonka-chat/ai-models.png",
      "public/images/wonka-chat/build-excel.png",
      "public/images/wonka-chat/choose-your-language.png",
      "public/images/wonka-chat/company_knowledge.png",
      "public/images/wonka-chat/connect-to-erp.png",
      "public/images/wonka-chat/presentation-creation.png",
      "public/images/wonka-chat/share-agent.png",
      "public/images/wonka-chat/wonka-ai-chat-header.png",
      "public/images/wonka-chat/word_creation.png"
    )
    Remove = @("public/images/wonka-chat/wonka-hero-flow-v2.png")
  },
  @{
    Branch = "feat/pricing-page"
    Msg = "feat: AI Workspace pricing page with seat calculator"
    Paths = @(
      "src/lib/pricing-calculator.ts","src/lib/pricing-format.ts",
      "src/components/sections/pricing-page.tsx",
      "src/components/sections/pricing-breakdown-modal.tsx",
      "src/app/(legal)/pricing/page.tsx"
    )
  },
  @{
    Branch = "feat/marketing-stub-pages"
    Msg = "feat: add marketing stub pages for workspace and services"
    Paths = @(
      "src/app/(legal)/about/page.tsx","src/app/(legal)/team/page.tsx",
      "src/app/(main)/agent-library/page.tsx","src/app/(main)/clients/page.tsx",
      "src/app/(main)/security/page.tsx","src/app/(main)/services/page.tsx",
      "src/app/(main)/services/ai-agent-development/page.tsx",
      "src/app/(main)/services/ai-app-development/page.tsx",
      "src/app/(main)/services/ai-strategy/page.tsx",
      "src/app/(main)/services/ai-training/page.tsx",
      "src/app/(main)/use-cases/page.tsx","src/app/(main)/workspace/page.tsx",
      "src/app/(main)/workspace/ai-agents/page.tsx","src/app/(main)/workspace/ai-apps/page.tsx",
      "src/app/(main)/workspace/ai-automations/page.tsx","src/app/(main)/workspace/governance/page.tsx"
    )
  },
  @{
    Branch = "feat/faq-and-lead-capture-tweaks"
    Msg = "feat: FAQ plain variant and lead capture helpers"
    Paths = @(
      "src/components/sections/faq-section.tsx",
      "src/components/sections/hero-lead-form.tsx",
      "src/components/turnstile-widget.tsx",
      "scripts/migrate-start-ai-leads.ts"
    )
  },
  @{
    Branch = "feat/design-token-deltas"
    Msg = "feat: align design tokens and globals with marketing pages"
    Paths = @(
      "src/lib/design-tokens.ts","src/styles/globals.css",
      "src/components/ui/button.tsx","src/components/ui/surface.tsx"
    )
  }
)

foreach ($pr in $PRs) {
  Commit-Branch -Branch $pr.Branch -Paths $pr.Paths -Remove $pr.Remove -Msg $pr.Msg
}

git checkout $Wip | Out-Null
