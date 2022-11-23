set -eu
set -o pipefail
#!/usr/bin/env bash
#########Installing yq
wget https://github.com/mikefarah/yq/releases/download/v4.18.1/yq_linux_amd64.tar.gz -O - |
  tar xz && mv yq_linux_amd64 /usr/bin/yq

###########find app name######
K8_APP=$(yq '.spec.selector.matchLabels.app' "${BITBUCKET_CLONE_DIR}"/k8/k8-deployment.yml | tail -n1 | awk '{ print $1}')
#########export value#########
export BITBUCKET_COMMIT="${BITBUCKET_BRANCH}-${BITBUCKET_BUILD_NUMBER}";
export K8_APP;
#####Replace values######
echo "deploying version=${BITBUCKET_COMMIT} to env=$1 app=${K8_APP}"
sed -i -e "s/{{BITBUCKET_COMMIT}}/${BITBUCKET_COMMIT}/g" "${BITBUCKET_CLONE_DIR}"/k8/k8-deployment.yml

deployEquinix() {
  env=$1
  DEP_FOLD=/tmp/${K8_APP}_k8
  echo "Deploying to Equinix"
  umask  077 ;
  echo "Installing openssh"
  apk update && apk add --update --no-cache openssh

  echo "Copying ssh known_hosts from env SSH_DEVOPS_KNOWN_HOSTS to ~/.ssh/known_hosts"
  echo "$SSH_DEVOPS_KNOWN_HOSTS" | base64 -d > ~/.ssh/known_hosts
  echo "Copying ssh private-key from env SSH_HOST_PRIVATE_KEY to ~/.ssh/id_rsa"
  echo "$SSH_DEVOPS_PRIVATE_KEY" | base64 -d > ~/.ssh/id_rsa
  ssh -o ConnectTimeout=15 -o BatchMode=yes "${SSH_DEVOPS_HOST}" -p "${SSH_DEVOPS_PORT}" "mkdir -p $DEP_FOLD && mkdir -p $DEP_FOLD/${env}" &&
      echo "Coping files k8-deployment.yml to server ${SSH_DEVOPS_HOST}:${SSH_DEVOPS_PORT}:${DEP_FOLD}/${env}" &&
      scp -o ConnectTimeout=15 -o BatchMode=yes -P "${SSH_DEVOPS_PORT}" "${BITBUCKET_CLONE_DIR}"/k8/k8-deployment.yml "${SSH_DEVOPS_HOST}":"${DEP_FOLD}"/"${env}" || exit 1
  echo "Connecting to server and executing" &&
      ssh -o ConnectTimeout=15 -o BatchMode=yes "${SSH_DEVOPS_HOST}" -p "${SSH_DEVOPS_PORT}" "app-deployer ${env} ${DEP_FOLD} ${BITBUCKET_COMMIT}"
}

deployAws() {
  echo "Deploying to AWS"
  apk --no-cache add py3-pip && \
  pip3 install -U awscli && \
  aws --version

  if [[ "$1" == *"production"* ]]; then
    CLUSTER=$AWS_K8_PROD_CLUSTER
  else
    CLUSTER=$AWS_K8_STAGING_CLUSTER
  fi

  aws eks --region eu-west-2 update-kubeconfig --name "$CLUSTER"
  kubectl apply -f "${BITBUCKET_CLONE_DIR}"/k8/k8-deployment.yml
}

deploy() {
  replicas=$2
  #Replace replica count
  sed -i -e "s/{{REPLICAS}}/${replicas}/g" "${BITBUCKET_CLONE_DIR}"/k8/k8-deployment.yml
  ########
  if [[ "${DEPLOYMENT_ENV}" == *"equinix"* ]]; then
    deployEquinix "$1"
  else
    ######Temporary fix for test
    if [[ "$1" == *"test"* ]]; then
      deployEquinix "$1"
    else
      deployAws "$1"
    fi
  fi
}

case "$1" in
test)
  deploy test 1
  ;;
staging)
  deploy staging 1
  ;;
production)
  deploy production 3
  ;;
*)
  echo "Usage: $0 {test|staging|production}"
  exit 1
  ;;
esac
