<?php
echo "Loaded config: " . php_ini_loaded_file() . PHP_EOL;
echo "Upload max filesize: " . ini_get('upload_max_filesize') . PHP_EOL;
echo "Post max size: " . ini_get('post_max_size') . PHP_EOL;
