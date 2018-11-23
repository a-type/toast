DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function install() {
  npm i
  pushd ${DIR}/../../apis/toast-core
  npm i
  popd
  pushd ${DIR}/../../apps/toast-web
  npm i
  popd
}

function test() {
  pushd ${DIR}/../../apis/toast-core
  npm test
  popd
  pushd ${DIR}/../../apps/toast-web
  npm test
  popd
}

function build() {
  docker login -u _json_key -p "$(cat ${HOME}/gcloud-service-key.json)" https://us.gcr.io
  pushd ${DIR}/../../apis/toast-core
  npm run containerize
  docker tag toast-core $IMAGE_REPO_SOURCE
  docker push $IMAGE_REPO_SOURCE
  popd
}
