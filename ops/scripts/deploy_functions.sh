DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function deploy() {
  helm upgrade $IMAGE_NAME ${DIR}/../helm/charts/toast-core --namespace="$NAMESPACE" --tiller-namespace="$TILLER_NAMESPACE"
  echo "Release upgraded"
}
