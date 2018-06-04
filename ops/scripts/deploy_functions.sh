DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function deploy() {
  helm upgrade ${IMAGE_NAME}${ENV_SUFFIX} ${DIR}/../helm/charts/toast-core --namespace="$NAMESPACE" --tiller-namespace="$TILLER_NAMESPACE" --set image.tag="$IMAGE_TAG"
  echo "Release upgraded"
}
