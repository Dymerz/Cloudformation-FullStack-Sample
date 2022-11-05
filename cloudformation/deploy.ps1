$STACK_NAME="simple-infra"
$REGION="us-east-1"
$AWS_PROFILE="cloud_guru"

# $USER_ID=$(aws sts get-caller-identity --query "Account" --output text --profile $AWS_PROFILE)

Write-Host "[+] Deploying CloudFormation 'infra.yml'"
aws cloudformation deploy --template-file .\infra.yaml --stack-name "$STACK_NAME" --profile $AWS_PROFILE --region $REGION --capabilities CAPABILITY_NAMED_IAM

Write-Host "[+] Getting ECS URIs"
$FRONTEND_ECR_URI=$(aws cloudformation list-exports --query 'Exports[?Name==`simple-infra-ecr-frontend-uri`].Value' --output text --profile $AWS_PROFILE --region $REGION)
$BACKEND_ECR_URI=$(aws cloudformation list-exports --query 'Exports[?Name==`simple-infra-ecr-backend-uri`].Value' --output text --profile $AWS_PROFILE --region $REGION)
$ECR_BASE_URL="$FRONTEND_ECR_URI".Split("/")[0]

Write-Host "[+] Authenticate to the ECR"
aws ecr get-login-password --profile $AWS_PROFILE --region $REGION | docker login --username AWS --password-stdin $ECR_BASE_URL

Write-Host "[+] Building Docker images"
docker build ../front -t "${FRONTEND_ECR_URI}:1"
docker build ../back -t "${BACKEND_ECR_URI}:1"

Write-Host "[+] Pushing to ECR"
docker push "${FRONTEND_ECR_URI}:1"
docker push "${BACKEND_ECR_URI}:1"


Write-Host "[+] Deploying services in '$STACK_NAME' stack"
# aws cloudformation deploy --template-file .\infra.yaml --stack-name "$STACK_NAME" --profile $AWS_PROFILE --region $REGION --capabilities CAPABILITY_NAMED_IAM
# aws cloudformation deploy --template-file .\infra.yaml --stack-name "$STACK_NAME" --profile $AWS_PROFILE --region $REGION --capabilities CAPABILITY_NAMED_IAM
