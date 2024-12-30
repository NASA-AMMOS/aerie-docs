#!/bin/bash

# Get next ADR number

filename=`find . -regex "\./[0-9][0-9][0-9][0-9].*\.md" | xargs basename | sort -n | tail -n 1`
filename="${filename%.*}"
printf -v num "%04d" "$((10#$filename + 1))"
newfile="$num.md"
cp template.md $newfile
sed -i '' -e "s/<ADRNUM>/$num/g" $newfile
echo "Created $newfile"