APP := uxpulse

.PHONY: lint test check build dev review review-post pr

lint:
	cd $(APP) && npm run lint

test:
	cd $(APP) && npm test

check: lint test

build:
	cd $(APP) && npm run build

dev:
	cd $(APP) && npm run dev

# Generate an AI review of this branch into review.md. Posts nothing.
review:
	bash scripts/review.sh
	@cat review.md

# Post the review you just read onto the current branch's PR.
review-post:
	@test -f review.md || (echo "No review.md -- run 'make review' first." && exit 1)
	gh pr comment -F review.md

# Everything before opening a PR: checks green, then a review to read.
pr: check review
