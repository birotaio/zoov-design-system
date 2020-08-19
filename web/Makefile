#
# Makefile for commands
#
# base repo
IMAGES_REPO_NAME := eu.gcr.io/birota-cloud
# name
IMAGE_NAME := zoov-design-system
# grep version from package.json
IMAGE_VERSION = $(shell cat package.json | grep version | head -1 | awk -F: '{ print $$2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')
# util
WORKING_DIR = $(shell pwd)

# shortcuts

all: tag publish

# utils

name:
	@echo NAME: $(IMAGE_NAME)

version:
	@echo VERSION: $(IMAGE_VERSION)

# create and push tag
tag:
	git tag v$(IMAGE_VERSION)
	git push origin v$(IMAGE_VERSION) --no-verify

# remove tag if created
remove-tag:
	git tag -d v$(IMAGE_VERSION)
	git push origin :refs/tags/v$(IMAGE_VERSION) --no-verify

# build app
publish:
	npm publish --access public

