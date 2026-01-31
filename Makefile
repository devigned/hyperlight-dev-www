.PHONY: help clean build serve test lint deploy

# Default target
help:
	@echo "Hyperlight Website - Available targets:"
	@echo "  make clean   - Remove build output (public/)"
	@echo "  make build   - Build the site with Zola"
	@echo "  make serve   - Start local development server"
	@echo "  make test    - Run DOM tests with Bun"
	@echo "  make lint    - Run linters (spelling, markdown, TypeScript)"
	@echo "  make deploy  - Deploy to gh-pages (CI only)"

clean:
	rm -rf public

build:
	zola build

serve:
	zola serve

lint:
	bun run cspell "content/**/*.md"
	bun run markdownlint-cli2 "content/**/*.md"
	bun run biome check .

test: build
	@echo "Starting Zola server for tests..."
	@zola serve --port 1111 > /dev/null 2>&1 & echo $$! > .zola.pid
	@sleep 2
	@cd tests && bun install --frozen-lockfile && bun test; \
		TEST_EXIT=$$?; \
		kill $$(cat ../.zola.pid) 2>/dev/null || true; \
		rm -f ../.zola.pid; \
		exit $$TEST_EXIT

deploy: build
ifndef GITHUB_ACTIONS
	$(error deploy target can only be run in GitHub Actions)
endif
	git config user.name "github-actions[bot]"
	git config user.email "github-actions[bot]@users.noreply.github.com"
	git checkout --orphan gh-pages-tmp
	git rm -rf --cached .
	mv public/* .
	rm -rf public themes sass templates content tests node_modules
	git add -A
	git commit -m "Deploy to GitHub Pages"
	git push origin gh-pages-tmp:gh-pages --force
	git checkout -f main
	git branch -D gh-pages-tmp
