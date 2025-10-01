# Parlios Workflows — Make targets
SHELL := /bin/bash
ROOT  := $(CURDIR)

list:
	@ls -d */ | grep -E '^[0-9]{2}_' || true

validate:
	@python3 scripts/validate_workflow.py

validate-only:
	@if [ -z "$(ONLY)" ]; then echo "Usage: make validate-only ONLY=01_programmatic_seo"; exit 1; fi
	@python3 scripts/validate_workflow.py --only $(ONLY)

.PHONY: list validate validate-only
