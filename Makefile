.PHONY: install setup dev build preview clean

install:
	npm install

setup: install

dev:
	ASTRO_TELEMETRY_DISABLED=1 npm run dev

build:
	ASTRO_TELEMETRY_DISABLED=1 npm run build

preview:
	ASTRO_TELEMETRY_DISABLED=1 npm run preview

clean:
	rm -rf dist .astro
