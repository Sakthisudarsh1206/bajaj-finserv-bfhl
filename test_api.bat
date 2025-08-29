@echo off
echo Testing Example A...
curl -X POST https://bajaj-finserv-qw1iii932-sakthisudharsen04-gmailcoms-projects.vercel.app/bfhl ^
  -H "Content-Type: application/json" ^
  -d "{\"data\": [\"a\",\"1\",\"334\",\"4\",\"R\", \"$\"]}"

echo.
echo.
echo Testing Example B...
curl -X POST https://bajaj-finserv-qw1iii932-sakthisudharsen04-gmailcoms-projects.vercel.app/bfhl ^
  -H "Content-Type: application/json" ^
  -d "{\"data\": [\"2\",\"a\", \"y\", \"4\", \"&\", \"-\", \"*\", \"5\",\"92\",\"b\"]}"

echo.
echo.
echo Testing Example C...
curl -X POST https://bajaj-finserv-qw1iii932-sakthisudharsen04-gmailcoms-projects.vercel.app/bfhl ^
  -H "Content-Type: application/json" ^
  -d "{\"data\": [\"A\",\"ABcD\",\"DOE\"]}"

echo.
echo.
echo Testing GET request (should return 405)...
curl -X GET https://bajaj-finserv-qw1iii932-sakthisudharsen04-gmailcoms-projects.vercel.app/bfhl

echo.
echo.
echo Testing invalid data (should return is_success: false)...
curl -X POST https://bajaj-finserv-qw1iii932-sakthisudharsen04-gmailcoms-projects.vercel.app/bfhl ^
  -H "Content-Type: application/json" ^
  -d "{\"data\": \"invalid\"}"

pause
