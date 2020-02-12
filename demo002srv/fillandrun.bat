start cmd /c node index.js
echo Waiting 5 seconds
ping localhost -n 5 >NUL
call fill.bat