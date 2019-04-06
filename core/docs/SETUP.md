## Documenting Setup

Use Jenkins-X to provision a cluster:

```
jx create cluster gke --skip-login -n toast-primary --docker-registry=us.gcr.io/toast-cooking-0 --git-private -m n1-standard-2 --max-num-nodes 4 --min-num-nodes 2 -z us-central1-a --enhanced-apis --enhanced-scopes -v 1.11.7-gke.6
```

[GCR usage](https://github.com/jenkins-x/jx/issues/400#issuecomment-460181220)

- Pre-Emptible: No
- Kaniko: No

```
jx upgrade ingress
```
