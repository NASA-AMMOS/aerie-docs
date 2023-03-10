#!/bin/bash

# This script uses a Docusaurus-based wrapper around the Prince PDF tool to convert our documentation into PDFs.
# See the 'generate-pdfs.yml' workflow file to see how it is called in GH Actions.
# We assume you have Prince installed, and it's on your PATH.
# For more information about Prince see: https://www.princexml.com/

# To more easily build a list of files to include in each PDF you can use the following command:
# npx docusaurus-prince-pdf -u https://nasa-ammos.github.io/aerie-docs/introduction/
# This will output a .txt index of all files under aerie-docs/introduction.

# Aerie API
npx docusaurus-prince-pdf \
  --pdf-only \
  -u https://nasa-ammos.github.io/aerie-docs/api/introduction/ \
  -f generate-pdfs/aerie-api.txt \
  -o pdf/aerie-api.pdf

# Aerie Concept of Operations
npx docusaurus-prince-pdf \
  --pdf-only \
  -u https://nasa-ammos.github.io/aerie-docs/overview/concept-of-operations/ \
  -f generate-pdfs/aerie-concept-of-operations.txt \
  -o pdf/aerie-concept-of-operations.pdf

# Aerie Mission Modeling Guide
npx docusaurus-prince-pdf \
  --pdf-only \
  -u https://nasa-ammos.github.io/aerie-docs/mission-modeling/introduction/ \
  -f generate-pdfs/aerie-mission-modeling-guide.txt \
  -o pdf/aerie-mission-modeling-guide.pdf

# Aerie Product Guide
npx docusaurus-prince-pdf \
  --pdf-only \
  -u https://nasa-ammos.github.io/aerie-docs/category/deployment/ \
  -f generate-pdfs/aerie-product-guide.txt \
  -o pdf/aerie-product-guide.pdf

# Aerie Software Design Document
npx docusaurus-prince-pdf \
  --pdf-only \
  -u https://nasa-ammos.github.io/aerie-docs/overview/software-design-document/ \
  -f generate-pdfs/aerie-software-design-document.txt \
  -o pdf/aerie-software-design-document.pdf

# Aerie Users Guide
npx docusaurus-prince-pdf \
  --pdf-only \
  -u https://nasa-ammos.github.io/aerie-docs/introduction/ \
  -f generate-pdfs/aerie-users-guide.txt \
  -o pdf/aerie-users-guide.pdf

