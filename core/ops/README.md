# Deploying to a fresh cluster

## Tools

Create RBAC config for Tiller (very permissive... waiting for Helm 3?)

```
kubectl create -f helm/rbac-config.yml
```

Initialize Helm

```
helm init --service-account tiller
```

## Database

Install Neo4J (database)

```
helm install --name neo4j stable/neo4j -f .\helm\values\neo4j.yml --namespace=production --tiller-namespace=kube-system
```

## Cert Manager

Install Cert Manager

[Link](https://docs.cert-manager.io/en/latest/getting-started/install.html#steps)

Create a Service Account with Cloud DNS permissions and add it to a secret:

Name: `cloud-dns-service-account`

```yml
key.json: SERVICE_ACCOUNT_JSON_BODY
```

Create a Cluster Issuer for cert-manager:

```
kubectl create -f .\k8s\cluster-issuer.yml
```

Create a certificate for toast-core:

```
kubectl create -f .\k8s\toast-core-cert.yml
```

## Secrets

Add required secrets. These will not be present in this repo as they contain sensitive material. The secret data we need:

_Firebase Config_

Name: `firebase-config`

```yml
databaseUrl: PROVIDE
messagingServerKey: PROVIDE
messagingSenderId: PROVIDE
```

_Service Account_

Name: `toast-core-service-account`

```yml
key.json: SERVICE_ACCOUNT_JSON_BODY
```

_Firebase Service Account_

Name: `firebase-service-account`

```yml
key.json: SERVICE_ACCOUNT_JSON_BODY
```

_Cloud Functions Secrets_

Name: `cloud-function-secrets`

```yml
recipe-scraper: PROVIDE
ingredient-parser: PROVIDE
```
