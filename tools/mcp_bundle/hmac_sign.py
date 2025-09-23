#!/usr/bin/env python3
import sys, hmac, hashlib
if len(sys.argv)!=3:
    print("Usage: hmac_sign.py <secret> <body-json>", file=sys.stderr)
    sys.exit(1)
secret=sys.argv[1].encode()
body=sys.argv[2].encode()
sig=hmac.new(secret, body, hashlib.sha256).hexdigest()
print(sig)
