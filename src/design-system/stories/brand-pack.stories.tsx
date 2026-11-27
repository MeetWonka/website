import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { assetCatalog } from "../generated/contracts";
import { FoundationHeader, TokenMeta } from "./story-layout";

type CatalogAsset = (typeof assetCatalog.assets)[number];
type CatalogFile = CatalogAsset["files"][number];

const BRAND_PACK_PREFIX = "public/brand/";

const KIND_ORDER = ["logo", "image", "video"] as const;

const KIND_TITLES: Record<(typeof KIND_ORDER)[number], string> = {
  logo: "Logos",
  image: "Imagery and treatments",
  video: "Motion",
};

function fileName(file: CatalogFile) {
  return file.path.split("/").at(-1) ?? file.path;
}

function previewBackground(file: CatalogFile) {
  if (file.theme === "dark") return "bg-black";
  if (file.theme === "light") return "bg-white";
  return "bg-surface";
}

function FilePreview({ file }: { file: CatalogFile }) {
  const src = file.publicUrl;

  if (file.mimeType.startsWith("video/")) {
    return (
      <video
        src={src}
        className="h-full w-full object-contain"
        muted
        loop
        playsInline
        controls
        preload="metadata"
      />
    );
  }

  if (file.mimeType.startsWith("image/")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={fileName(file)}
        loading="lazy"
        className="h-full w-full object-contain"
      />
    );
  }

  return (
    <a className="type-paragraph-s underline" href={src}>
      {fileName(file)}
    </a>
  );
}

function AssetSection({ asset }: { asset: CatalogAsset }) {
  // Raster duplicates of vector logos add noise to the specimen; the catalog keeps both.
  const files = asset.files.filter(
    (file) =>
      file.path.startsWith(BRAND_PACK_PREFIX) &&
      !(asset.kind === "logo" && file.mimeType === "image/png"),
  );

  if (files.length === 0) return null;

  return (
    <section className="mb-14">
      <TokenMeta
        id={asset.id}
        value={`${asset.name} · ${asset.lifecycle}`}
        description={asset.usage.allowed.join(" ")}
      />
      <div className="sb-wonka-token-grid mt-5">
        {files.map((file) => (
          <figure key={file.path} className="sb-wonka-token-card">
            <div
              className={`grid aspect-video place-items-center p-4 ${previewBackground(file)}`}
            >
              <FilePreview file={file} />
            </div>
            <figcaption className="sb-wonka-token-meta">
              <code className="sb-wonka-token-id">{fileName(file)}</code>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function BrandPack() {
  return (
    <main className="sb-wonka-page">
      <FoundationHeader
        eyebrow="Assets · Brand pack"
        title="Every brand asset, one catalog."
        description="Logos in the five official colors, painted backgrounds, profile avatars, logo cards, watermarks, and motion. Files are rendered from design-system/assets.json, so this page and the agent catalog never drift. Everything here is review_required until rights and approval are recorded."
      />

      {KIND_ORDER.map((kind) => (
        <section key={kind} className="mb-20">
          <h2 className="type-h6 mb-8">{KIND_TITLES[kind]}</h2>
          {assetCatalog.assets
            .filter((asset) => asset.kind === kind)
            .map((asset) => (
              <AssetSection key={asset.id} asset={asset} />
            ))}
        </section>
      ))}
    </main>
  );
}

const meta = {
  title: "Assets/Brand pack",
  component: BrandPack,
  parameters: {
    docs: {
      description: {
        component:
          "Visual index of the Wonka brand pack, generated from the asset catalog.",
      },
    },
  },
} satisfies Meta<typeof BrandPack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Catalog: Story = {};
