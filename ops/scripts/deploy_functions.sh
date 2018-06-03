DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function deploy() {
  if helm get $IMAGE_NAME --tiller-namespace="$TILLER_NAMESPACE"; then
    helm upgrade $IMAGE_NAME ${DIR}/../helm/charts/toast-core --namespace="$NAMESPACE" --tiller-namespace="$TILLER_NAMESPACE"
  else
    helm install $IMAGE_NAME ${DIR}/../helm/charts/toast-core --namespace="$NAMESPACE" --tiller-namespace="$TILLER_NAMESPACE"
  fi
}
