#!/bin/bash
all_files=$( find /var/www/piedrasblancas.com.uy/images -type f -name '*.png' -o -name '*.jpg' -o -name '*.jpeg'  )
cd /var/www/piedrasblancas.com.uy/images;
while read line
do
	echo "About to convert $line ..."
	convert -resize "800x600"! $line  ./tmp_image && cat ./tmp_image > $line
	echo "Done!"
done <<< "$all_files"


