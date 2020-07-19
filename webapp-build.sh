mkdir app
rm -rf app/shantideva-web
cp -rv src/web app/shantideva-web

# create several dummy files which are not really needed when running outside of cordova.
touch app/shantideva-web/cordova.js
mkdir app/shantideva-web/js/
touch app/shantideva-web/js/index.js


