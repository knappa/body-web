#!/bin/sh

export FLASK_APP=server
#export FLASK_ENV=development

waitress-serve --host=0.0.0.0 --port=5000 --call 'server:create_app'
