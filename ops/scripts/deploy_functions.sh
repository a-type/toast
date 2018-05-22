function deploy() {
  if kubectl describe deployment $IMAGE_NAME; then
    kubectl set image deployment/$IMAGE_NAME $IMAGE_NAME=$IMAGE_REPO_SOURCE
  else
    kubectl run $IMAGE_NAME --image=$IMAGE_REPO_SOURCE --port $APP_PORT
  fi
}
