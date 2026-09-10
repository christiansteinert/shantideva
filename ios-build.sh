#!/bin/sh
# Local simulator build; release signing remains in the release workflow.
set -eu
cd "$(dirname "$0")"
exec npm run build:ios -- "$@"
