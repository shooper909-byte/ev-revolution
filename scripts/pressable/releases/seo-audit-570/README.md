# SEO audit 570: restored original collection design

The original Mrs. Collection design and content were restored on October 21, 2026 at the user’s explicit request. The installed `static-pages/mrs-collection.html` was preserved unchanged throughout. The production transport now reads that original document rather than embedding a replacement overview. Images, cards, copy, original layout and scripts are preserved. Only canonical and meta-description corrections are applied; the URL returns 200 before the legacy redirect. The other audit fixes and sitemap entry remain active.

The adjacent PHP file records the exact deployed `eves-sisters-2.15.0/early-access.php`, preserving the existing early-access endpoint and sitemap hook. It is a release archive, not an additional file to include in the theme. Future full packages should use the normal source transport and built HTML.

The Next.js collection page and its mrsCollection data were restored from the repository history, with the same SEO metadata corrections.

Verification: WordPress confirmed File edited successfully; Edge Cache confirmed the purge. Live browser verification confirmed the original heading, all six images loaded, canonical, 137-character description and no horizontal overflow. Anonymous HTTP checks confirmed the original body and scripts match exactly after existing asset URL rewrites and the metadata update. Original theme files were backed up before editing.
