Things I just want to remember.

## Upgrading GCE ArangoDB

1. Edit instance. Add `--database.auto-upgrade` and `true` parameters to Docker container args.
2. Save and restart.
3. Wait for upgrade to complete
4. Remove the params, save and restart.
