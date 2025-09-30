
# Parlios Brainstorm Archivist Pack

This pack ships a GitHub Actions workflow and a starter doc so you can append brainstorm notes directly into `docs/Brainstorms_Parlios.md` via:
- Pushing `inbox/brainstorm_*.md` files
- Creating an issue labeled `brainstorm` (body = markdown)
- Commenting `[BRAINSTORM]` + markdown on any issue
- Dispatching the workflow with raw markdown content

## Install
1) Unzip this pack at the root of your repository (it contains `.github/`, `docs/`, `tools/`).
2) Commit & push.
3) Ensure repo settings → Actions → Workflow permissions → **Read and write**.
4) Optionally, use `tools/dispatch_brainstorm.sh` with a `GITHUB_TOKEN` to fire the workflow remotely.

## Tips
- Keep each brainstorm in markdown (titles, bullets).
- Append is default; set `mode=replace` when running the workflow if you need a full overwrite.
- The workflow auto-creates the file if missing.
