#!/bin/bash

# List the title line for each
grep '# \[' `find . -regex "\./[0-9][0-9][0-9][0-9].*\.md"` | awk -F ':# ' '{print $2}' | sort -n
