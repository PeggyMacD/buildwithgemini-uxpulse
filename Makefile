APP := uxpulse

.PHONY: lint test check build dev

lint:
	cd $(APP) && npm run lint

test:
	cd $(APP) && npm test

check: lint test

build:
	cd $(APP) && npm run build

dev:
	cd $(APP) && npm run dev
