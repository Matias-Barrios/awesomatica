
function Replace_Text ([String]$file_name, [String]$pattern,[String]$new) {


    (Get-Content $file_name) -replace $pattern, $new | Set-Content  $file_name
}

function Get_random_file([String]$path ){

    $all_items=$( Get-ChildItem $path '*.txt' );
    return $all_items[$( Get-Random -minimum 0 -maximum $all_items.length )];
}

#Replace_Text "c:\test.txt" "bgmusic.*" "bgmusic = /sound/music.mp3"

Get_random_file "c:\"

