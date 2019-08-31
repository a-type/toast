Things I just want to remember.

## Upgrading GCE ArangoDB

1. Edit instance. Add `--database.auto-upgrade` and `true` parameters to Docker container args.
2. Save and restart.
3. Wait for upgrade to complete
4. Remove the params, save and restart.

## Berglas

Berglas is the secret vault used by Cloud Run services.

To create a secret in Berglas to be used by a service:

**THESE VALUES ARE FOR PROD**

```
berglas create toast-secrets/<secret_name> <secret_data> --key projects/toast-cooking/locations/global/keyRings/berglas/cryptoKeys/berglas-key
```

Then you have to give access to the service account:

```
berglas grant toast-secrets/<secret_name> --member serviceAccount:644973214216-compute@developer.gserviceaccount.com
```
