DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function deploy() {
  if helm get $IMAGE_NAME; then
    helm upgrade $IMAGE_NAME DIR/../helm/charts/toast-core --namespace="$NAMESPACE"
  else
    helm install $IMAGE_NAME DIR/../helm/charts/toast-core --namespace="$NAMESPACE"
  fi
}
