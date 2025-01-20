#!/bin/sh
cd send-messages
rm -rf lib
mkdir lib
cd lib

PYTHONPATH=.


#easy_install-2.7 -d . apns2
#rm *
#rm -rf */EGG-INFO
#rm -rf */.*
#rm -rf */*.so

#mv */* .
#rmdir *.egg
#rm -rf *-info
#rm -rf __pycache__

# install libraries. We are using a slightly updated, slightly more up to date fork of the python apns2 lib. See: https://github.com/compat-fork/PyAPNs2?tab=readme-ov-file
pip3 install compat-fork-apns2 -t .
rm -rf *-info
rm * 2> /dev/null
rm -rf .*
rm -rf bin
rm -rf __pycache__
rm -rf **/__pycache__

# The apns2 library has dependencies that use use an outdated HTTP import directives which we need to update in order to conform to later Python versions
sed -i 's/from collections import Callable/from collections.abc import Callable/g' cffi/api.py

sed -i 's/from collections import Iterable, Mapping/from collections.abc import Iterable, Mapping/g' hyper/http11/connection.py

sed -i 's/collections.MutableMapping/collections.abc.MutableMapping/g' hyper/common/headers.py
sed -i 's/collections.MutableMapping/collections.abc.MutableMapping/g' h2/settings.py

sed -i 's/collections.Iterable/collections.abc.Iterable/g' hyper/http11/connection.py

sed -i 's/collections.MutableSet/collections.abc.MutableSet/g' hyperframe/flags.py
sed -i 's/collections.MutableSet/collections.abc.MutableSet/g' hyper/packages/hyperframe/flags.py

# Workarounds for functionality that does not exist anymore in recent Python versions
sed -i 's/if _ssl_context.check_hostname:/if False and _ssl_context.check_hostname:/g' hyper/tls.py

