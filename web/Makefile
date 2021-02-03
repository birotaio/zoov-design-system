#
# Makefile for commands
#
# base repo
IMAGES_REPO_NAME := eu.gcr.io/birota-cloud
# name
IMAGE_NAME := zoov-design-system
# grep version from package.json
IMAGE_VERSION = $(shell cat package.json | grep "\"version\"" | cut -d\" -f4)

# shortcuts
all: tag publish sandbox

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

###
### LIBRARY
###

publish:
	npm publish --access public

###
### SANDBOX
###

sandbox: version build-sandbox image-sandbox push-sandbox deploy-sandbox

# build sandbox
build-sandbox:
	yarn build:sandbox

# build image
image-sandbox:
	@echo "### BUILDING IMAGE ###"
	@echo NAME: $(IMAGE_NAME)
	@echo VERSION: $(IMAGE_VERSION)
	docker build -t $(IMAGES_REPO_NAME)/$(IMAGE_NAME):latest -t $(IMAGES_REPO_NAME)/$(IMAGE_NAME):$(IMAGE_VERSION) .

# run and kill and rm
run-sandbox:
	docker run -itd --name $(IMAGE_NAME) -p 3000:8080 -e IMAGE_VERSION=$(IMAGE_VERSION) $(IMAGES_REPO_NAME)/$(IMAGE_NAME):$(IMAGE_VERSION)

kill-sandbox:
	docker kill $(IMAGE_NAME)

rm-sandbox:
	docker rm $(IMAGE_NAME)

# clean
clean-sandbox: kill-sandbox rm-sandbox

# push
push-sandbox:
	docker push $(IMAGES_REPO_NAME)/$(IMAGE_NAME):$(IMAGE_VERSION); \
	docker push $(IMAGES_REPO_NAME)/$(IMAGE_NAME):latest

# deploy
deploy-sandbox:
	@cd ../../platform-helm-charts/scripts; \
	./deploy.sh -e prod -s $(IMAGE_NAME) -v $(IMAGE_VERSION); \
	cd ..; \
	helm upgrade $(IMAGE_NAME)-prod -f prod/$(IMAGE_NAME).yaml charts/$(IMAGE_NAME); \
	cd $(WORKING_DIR);

.PHONY: clean-sandbox deploy
