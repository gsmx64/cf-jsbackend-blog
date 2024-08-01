pipeline {
    agent any
    environment {
        APP_NAME = "cf-blog"
        APP_NAME_BACKEND = "${APP_NAME}-backend"
        APP_NAME_FRONTEND = "${APP_NAME}-frontend"
        APP_NAME_PROD_REVERSE_PROXY = "${APP_NAME}-reverse-proxy"
        APP_IMAGE_NAME_BACKEND = "gsmx64/${APP_NAME_BACKEND}"
        APP_IMAGE_NAME_FRONTEND = "gsmx64/${APP_NAME_FRONTEND}"
        APP_IMAGE_NAME_PROD_REVERSE_PROXY = "gsmx64/${APP_NAME_PROD_REVERSE_PROXY}"
        OWASP_DCV_TOKEN = credentials('owasp-nvd-api')
        SONARQUBE_TOKEN = credentials('sonarqube-secret-key')
    }
    tools {
        nodejs "nodejs-v20.14"
    }
    stages {
        /*stage("Install Project Dependencies - backend") {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs-v20.14') {
                    sh """
                        cd backend
                        npm install && npm install --global yarn
                        cd ..
                    """
                }
            }
        }
        stage("Install Project Dependencies - frontend") {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs-v20.14') {
                    sh """
                        cd frontend
                        npm install && npm install --global yarn
                        cd ..
                    """
                }
            }
        }*/
        /*stage('Code Quality Check via SonarQube') {
            steps {
                sh """
                    rm -f dependency-check-*
                """
                script {
                    def scannerHome = tool 'sonarqube';
                    withSonarQubeEnv('sonarqube') {
                        sh "${tool('sonarqube')}"+'/bin/sonar-scanner \
                        -Dsonar.projectKey=${APP_NAME} \
                        -Dsonar.sources=. \
                        -Dsonar.css.node=. \
                        -Dsonar.python.version=3.10 \
                        -Dsonar.nodejs.version=20.14 \
                        -Dsonar.javascript.node.maxspace=6144 \
                        -Dsonar.host.url=http://localhost:9000 \
                        -Dsonar.login=$SONARQUBE_TOKEN'
                    }
                }
            }
        }*/
        /*stage('Unittesting - backend') {
            steps {
                sh """
                    cd backend
                    cp .env.testing.sample .env.testing
                    sed -i 's/^APP_DB_HOST=.*%/APP_DB_HOST=${APP_TESTING_DB_HOST}/' .env.testing
                    sed -i 's/^APP_DB_PORT=.*%/APP_DB_PORT=${APP_TESTING_DB_PORT}/' .env.testing
                    sed -i 's/^APP_DB_NAME=.*%/APP_DB_NAME=${APP_TESTING_DB_NAME}/' .env.testing
                    sed -i 's/^APP_DB_USER=.*%/APP_DB_USER=${APP_TESTING_DB_USER}/' .env.testing
                    sed -i 's/^APP_DB_PASSWORD=.*%/APP_DB_PASSWORD=${APP_TESTING_DB_PASSWORD}/' .env.testing
                    export NODE_ENV=testing && npm run m:generate:test && npm run m:migrate:test
                    export NODE_ENV=testing && npm test
                    cd ..
                """
            }
        }
        stage('Unittesting - frontend') {
            steps {
                sh """
                    cd frontend
                    cp .env.testing.sample .env.testing
                    export NODE_ENV=testing && npm test
                    cd ..
                """
            }
        }*/
        /*stage('OWASP Dependency-Check Vulnerabilities - backend') {
            steps {
                sh """
                    cd backend
                """
                dependencyCheck additionalArguments: '''
                            -o "./"
                            -s "./"
                            -f "ALL"
                            --prettyPrint
                            --nvdApiKey $OWASP_DCV_TOKEN''', odcInstallation: "OWASP Dependency-Check Vulnerabilities"
                
                dependencyCheckPublisher pattern: "dependency-check-report.xml"
                sh """
                    cd ..
                    rm -f dependency-check-*
                """
            }
        }
        stage('OWASP Dependency-Check Vulnerabilities - frontend') {
            steps {
                sh """
                    cd frontend
                """
                dependencyCheck additionalArguments: '''
                            -o "./"
                            -s "./"
                            -f "ALL"
                            --prettyPrint
                            --nvdApiKey $OWASP_DCV_TOKEN''', odcInstallation: "OWASP Dependency-Check Vulnerabilities"
                
                dependencyCheckPublisher pattern: "dependency-check-report.xml"
                sh """
                    cd ..
                    rm -f dependency-check-*
                """
            }
        }*/
        /*stage('Check local Docker Engine Status') {
            steps {
                script {
                    def check_docker = sh(returnStdout: true, script: "systemctl is-active docker")
                    if (check_docker.trim() != 'active') {
                        echo '---------------------------------------------------------------------------------'
                        echo '> ERROR: Docker Engine does not seem to be running! Status: '+check_docker.trim()
                        echo '---------------------------------------------------------------------------------'
                        exit 1
                    }
                }
            }
        }
        stage('Build docker development images') {
            steps {
                sh """
                    if [ -f .env ]; then rm -f .env; fi
                    cp .env.sample .env
                    cp ./backend/.env.docker.development.sample ./backend/.env.development
                    cp ./frontend/.env.docker.development.sample ./frontend/.env.development
                    sed -i 's/^APP_BUILD_NUMBER=.*%/APP_BUILD_NUMBER=${APP_BUILD_NUMBER}/' .env
                    sed -i 's/^DOCKER_DATABASE_PORT=.*%/DOCKER_DATABASE_PORT=5433/' .env
                    docker compose -f docker-compose.dev.yml up --build --force-recreate --detach
                """
            }
        }
        stage('Test docker development image - backend') {
            steps {
                script {
                    def status_dev = sh(returnStdout: true, script: "docker container inspect -f '{{.State.Status}}' '$APP_NAME_BACKEND-dev'")
                    echo '----------------------------------------------------------'
                    if (status_dev.trim() == 'running') {
                        echo '> Docker development backend image: running correctly.'
                    } else {
                        echo '> Docker development backend image: not working the container.'
                    }
                    echo '----------------------------------------------------------'
                    echo '> Container status: '+status_dev.trim()
                    echo '----------------------------------------------------------'
                    if (status_dev.trim() != 'running') exit 1
                }
            }
        }
        stage('Test docker development image - frontend') {
            steps {
                script {
                    def status_dev = sh(returnStdout: true, script: "docker container inspect -f '{{.State.Status}}' '$APP_NAME_FRONTEND-dev'")
                    echo '----------------------------------------------------------'
                    if (status_dev.trim() == 'running') {
                        echo '> Docker development frontend image: running correctly.'
                    } else {
                        echo '> Docker development frontend image: not working the container.'
                    }
                    echo '----------------------------------------------------------'
                    echo '> Container status: '+status_dev.trim()
                    echo '----------------------------------------------------------'
                    if (status_dev.trim() != 'running') exit 1
                }
            }
        }
        stage('Tag docker development images and push to Dockerhub') {
            steps {
                sh """
                    cat ~/.docker/docker.txt | docker login --username gsmx64 --password-stdin
                    docker tag ${APP_IMAGE_NAME_BACKEND}-dev:${APP_BUILD_NUMBER} ${APP_IMAGE_NAME_BACKEND}-dev:latest
                    docker tag ${APP_IMAGE_NAME_FRONTEND}-dev:${APP_BUILD_NUMBER} ${APP_IMAGE_NAME_FRONTEND}-dev:latest
                    docker push ${APP_IMAGE_NAME_BACKEND}-dev:latest
                    docker push ${APP_IMAGE_NAME_FRONTEND}-dev:latest
                    docker tag ${APP_IMAGE_NAME_BACKEND}-dev:latest ${APP_IMAGE_NAME_BACKEND}-dev:${APP_BUILD_NUMBER}
                    docker tag ${APP_IMAGE_NAME_FRONTEND}-dev:latest ${APP_IMAGE_NAME_FRONTEND}-dev:${APP_BUILD_NUMBER}
                    docker push ${APP_IMAGE_NAME_BACKEND}-dev:${APP_BUILD_NUMBER}
                    docker push ${APP_IMAGE_NAME_FRONTEND}-dev:${APP_BUILD_NUMBER}
                    docker logout
                """
            }
        }*/
        /*stage('Scan Docker development image with Trivy - HIGH severity - backend') {
            steps {
                script {
                    def trivyOutput = sh(script: "trivy image --severity HIGH ${APP_IMAGE_NAME_BACKEND}-dev:${APP_BUILD_NUMBER}", returnStdout: true).trim()
                    println trivyOutput

                    if (trivyOutput.contains("Total: 0")) {
                        echo "No HIGH vulnerabilities found in the Docker backend image."
                    } else {
                        echo "HIGH vulnerabilities found in the Docker backend image."
                    }
                }
            }
        }
        stage('Scan Docker development image with Trivy - CRITICAL severity - backend') {
            steps {
                script {
                    def trivyOutput = sh(script: "trivy image --severity CRITICAL ${APP_IMAGE_NAME_BACKEND}-dev:${APP_BUILD_NUMBER}", returnStdout: true).trim()
                    println trivyOutput

                    if (trivyOutput.contains("Total: 0")) {
                        echo "No CRITICAL vulnerabilities found in the Docker backend image."
                    } else {
                        echo "CRITICAL vulnerabilities found in the Docker backend image."
                    }
                }
            }
        }
        stage('Scan Docker development image with Trivy - HIGH severity - frontend') {
            steps {
                script {
                    def trivyOutput = sh(script: "trivy image --severity HIGH ${APP_IMAGE_NAME_FRONTEND}-dev:${APP_BUILD_NUMBER}", returnStdout: true).trim()
                    println trivyOutput

                    if (trivyOutput.contains("Total: 0")) {
                        echo "No HIGH vulnerabilities found in the Docker frontend image."
                    } else {
                        echo "HIGH vulnerabilities found in the Docker frontend image."
                    }
                }
            }
        }
        stage('Scan Docker development image with Trivy - CRITICAL severity - frontend') {
            steps {
                script {
                    def trivyOutput = sh(script: "trivy image --severity CRITICAL ${APP_IMAGE_NAME_FRONTEND}-dev:${APP_BUILD_NUMBER}", returnStdout: true).trim()
                    println trivyOutput

                    if (trivyOutput.contains("Total: 0")) {
                        echo "No CRITICAL vulnerabilities found in the Docker frontend image."
                    } else {
                        echo "CRITICAL vulnerabilities found in the Docker frontend image."
                    }
                }
            }
        }*/
        /*stage('Stop docker development containers and do docker clean up') {
            steps {
                sh """
                    docker compose -f docker-compose.dev.yml down -v
                    docker system prune -af
                    docker volume prune -f
                    docker network prune -f
                    rm -f .env
                """
            }
        }*/
        stage('Build docker production images') {
            steps {
                sh """
                    if [ -f .env ]; then rm -f .env; fi
                    sed -i 's/^DOCKER_DATABASE_PORT=.*/DOCKER_DATABASE_PORT=5433/' .env.sample
                    cp .env.sample .env
                    cp ./backend/.env.docker.production.sample ./backend/.env.production
                    cp ./frontend/.env.docker.production.sample ./frontend/.env.production
                    sed -i 's/^APP_DB_PORT=.*/APP_DB_PORT=5433/' ./backend/.env.production
                    sed -i 's/^DOCKER_APP_HTTP_PORT=.*/DOCKER_APP_HTTP_PORT=81/' .env
                    sed -i 's/^DOCKER_APP_HTTPS_PORT=.*/DOCKER_APP_HTTPS_PORT=7443/' .env
                    docker compose -f docker-compose.prod.db.yml up --build --force-recreate --detach
                """
            }
        }
        stage('Test docker production image - backend') {
            steps {
                script {
                    def status_dev = sh(returnStdout: true, script: "docker container inspect -f '{{.State.Status}}' '$APP_NAME_BACKEND'")
                    echo '----------------------------------------------------------'
                    if (status_dev.trim() == 'running') {
                        echo '> Docker production backend image: running correctly.'
                    } else {
                        echo '> Docker production backend image: not working the container.'
                    }
                    echo '----------------------------------------------------------'
                    echo '> Container status: '+status_dev.trim()
                    echo '----------------------------------------------------------'
                    if (status_dev.trim() != 'running') exit 1
                }
            }
        }
        stage('Test docker production image - frontend') {
            steps {
                script {
                    def status_dev = sh(returnStdout: true, script: "docker container inspect -f '{{.State.Status}}' '$APP_NAME_FRONTEND'")
                    echo '----------------------------------------------------------'
                    if (status_dev.trim() == 'running') {
                        echo '> Docker production frontend image: running correctly.'
                    } else {
                        echo '> Docker production frontend image: not working the container.'
                    }
                    echo '----------------------------------------------------------'
                    echo '> Container status: '+status_dev.trim()
                    echo '----------------------------------------------------------'
                    if (status_dev.trim() != 'running') exit 1
                }
            }
        }
        stage('Test docker production image - reverse-proxy') {
            steps {
                script {
                    def status_dev = sh(returnStdout: true, script: "docker container inspect -f '{{.State.Status}}' '$APP_NAME_PROD_REVERSE_PROXY'")
                    echo '----------------------------------------------------------'
                    if (status_dev.trim() == 'running') {
                        echo '> Docker production reverse-proxy image: running correctly.'
                    } else {
                        echo '> Docker production reverse-proxy image: not working the container.'
                    }
                    echo '----------------------------------------------------------'
                    echo '> Container status: '+status_dev.trim()
                    echo '----------------------------------------------------------'
                    if (status_dev.trim() != 'running') exit 1
                }
            }
        }
        stage('Tag docker production images and push to Dockerhub') {
            steps {
                sh """
                    cat ~/.docker/docker.txt | docker login --username gsmx64 --password-stdin
                    docker tag ${APP_IMAGE_NAME_BACKEND}:${APP_BUILD_NUMBER} ${APP_IMAGE_NAME_BACKEND}:latest
                    docker tag ${APP_IMAGE_NAME_FRONTEND}:${APP_BUILD_NUMBER} ${APP_IMAGE_NAME_FRONTEND}:latest
                    docker tag ${APP_IMAGE_NAME_PROD_REVERSE_PROXY}:${APP_BUILD_NUMBER} ${APP_IMAGE_NAME_PROD_REVERSE_PROXY}:latest
                    docker push ${APP_IMAGE_NAME_BACKEND}:latest
                    docker push ${APP_IMAGE_NAME_FRONTEND}:latest
                    docker push ${APP_IMAGE_NAME_PROD_REVERSE_PROXY}:latest
                    docker tag ${APP_IMAGE_NAME_BACKEND}:latest ${APP_IMAGE_NAME_BACKEND}:${APP_BUILD_NUMBER}
                    docker tag ${APP_IMAGE_NAME_FRONTEND}:latest ${APP_IMAGE_NAME_FRONTEND}:${APP_BUILD_NUMBER}
                    docker tag ${APP_IMAGE_NAME_PROD_REVERSE_PROXY}:latest ${APP_IMAGE_NAME_PROD_REVERSE_PROXY}:${APP_BUILD_NUMBER}
                    docker push ${APP_IMAGE_NAME_BACKEND}:${APP_BUILD_NUMBER}
                    docker push ${APP_IMAGE_NAME_FRONTEND}:${APP_BUILD_NUMBER}
                    docker push ${APP_IMAGE_NAME_PROD_REVERSE_PROXY}:${APP_BUILD_NUMBER}
                    docker logout
                """
            }
        }
        /*stage('Scan Docker production image with Trivy - HIGH severity - backend') {
            steps {
                script {
                    def trivyOutput = sh(script: "trivy image --severity HIGH ${APP_IMAGE_NAME_BACKEND}:${APP_BUILD_NUMBER}", returnStdout: true).trim()
                    println trivyOutput

                    if (trivyOutput.contains("Total: 0")) {
                        echo "No HIGH vulnerabilities found in the Docker backend image."
                    } else {
                        echo "HIGH vulnerabilities found in the Docker backend image."
                    }
                }
            }
        }
        stage('Scan Docker production image with Trivy - CRITICAL severity - backend') {
            steps {
                script {
                    def trivyOutput = sh(script: "trivy image --severity CRITICAL ${APP_IMAGE_NAME_BACKEND}:${APP_BUILD_NUMBER}", returnStdout: true).trim()
                    println trivyOutput

                    if (trivyOutput.contains("Total: 0")) {
                        echo "No CRITICAL vulnerabilities found in the Docker backend image."
                    } else {
                        echo "CRITICAL vulnerabilities found in the Docker backend image."
                    }
                }
            }
        }
        stage('Scan Docker production image with Trivy - HIGH severity - frontend') {
            steps {
                script {
                    def trivyOutput = sh(script: "trivy image --severity HIGH ${APP_IMAGE_NAME_FRONTEND}:${APP_BUILD_NUMBER}", returnStdout: true).trim()
                    println trivyOutput

                    if (trivyOutput.contains("Total: 0")) {
                        echo "No HIGH vulnerabilities found in the Docker frontend image."
                    } else {
                        echo "HIGH vulnerabilities found in the Docker frontend image."
                    }
                }
            }
        }
        stage('Scan Docker production image with Trivy - CRITICAL severity - frontend') {
            steps {
                script {
                    def trivyOutput = sh(script: "trivy image --severity CRITICAL ${APP_IMAGE_NAME_FRONTEND}:${APP_BUILD_NUMBER}", returnStdout: true).trim()
                    println trivyOutput

                    if (trivyOutput.contains("Total: 0")) {
                        echo "No CRITICAL vulnerabilities found in the Docker frontend image."
                    } else {
                        echo "CRITICAL vulnerabilities found in the Docker frontend image."
                    }
                }
            }
        }
        stage('Scan Docker production image with Trivy - HIGH severity - reverse-proxy') {
            steps {
                script {
                    def trivyOutput = sh(script: "trivy image --severity HIGH ${APP_IMAGE_NAME_PROD_REVERSE_PROXY}:${APP_BUILD_NUMBER}", returnStdout: true).trim()
                    println trivyOutput

                    if (trivyOutput.contains("Total: 0")) {
                        echo "No HIGH vulnerabilities found in the Docker reverse-proxy image."
                    } else {
                        echo "HIGH vulnerabilities found in the Docker reverse-proxy image."
                    }
                }
            }
        }
        stage('Scan Docker production image with Trivy - CRITICAL severity - reverse-proxy') {
            steps {
                script {
                    def trivyOutput = sh(script: "trivy image --severity CRITICAL ${APP_IMAGE_NAME_PROD_REVERSE_PROXY}:${APP_BUILD_NUMBER}", returnStdout: true).trim()
                    println trivyOutput

                    if (trivyOutput.contains("Total: 0")) {
                        echo "No CRITICAL vulnerabilities found in the Docker reverse-proxy image."
                    } else {
                        echo "CRITICAL vulnerabilities found in the Docker reverse-proxy image."
                    }
                }
            }
        }*/
        /*stage('Stop docker production containers and do docker clean up') {
            steps {
                sh """
                    docker compose -f docker-compose.prod.db.yml down -v
                    docker system prune -af
                    docker volume prune -f
                    docker network prune -f
                    rm -f .env
                """
            }
        }*/
        stage('Deploy cf-blog on Kubernetes cluster') {
            steps {
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl create namespace $APP_NAME || true"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-apisecret -n $APP_NAME || true && kubectl create secret generic $APP_NAME-apisecret --from-literal=APP_AUTH_SECRET=$APP_AUTH_SECRET -n $APP_NAME"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-facebookenabled -n $APP_NAME || true && kubectl create secret generic $APP_NAME-facebookenabled --from-literal=APP_AUTH_FACEBOOK_ENABLE=$APP_AUTH_FACEBOOK_ENABLE -n $APP_NAME"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-facebookkey -n $APP_NAME || true && kubectl create secret generic $APP_NAME-facebookkey --from-literal=APP_AUTH_FACEBOOK_KEY=$APP_AUTH_FACEBOOK_KEY -n $APP_NAME"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-facebooksecret -n $APP_NAME || true && kubectl create secret generic $APP_NAME-facebooksecret --from-literal=APP_AUTH_FACEBOOK_SECRET=$APP_AUTH_FACEBOOK_SECRET -n $APP_NAME"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-googleenabled -n $APP_NAME || true && kubectl create secret generic $APP_NAME-googleenabled --from-literal=APP_AUTH_GOOGLE_ENABLE=$APP_AUTH_GOOGLE_ENABLE -n $APP_NAME"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-googleid -n $APP_NAME || true && kubectl create secret generic $APP_NAME-googleid --from-literal=APP_AUTH_GOOGLE_ID=$APP_AUTH_GOOGLE_ID -n $APP_NAME"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-googlesecret -n $APP_NAME || true && kubectl create secret generic $APP_NAME-googlesecret --from-literal=APP_AUTH_GOOGLE_SECRET=$APP_AUTH_GOOGLE_SECRET -n $APP_NAME"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-twitterenabled -n $APP_NAME || true && kubectl create secret generic $APP_NAME-twitterenabled --from-literal=APP_AUTH_TWITTER_ENABLE=$APP_AUTH_TWITTER_ENABLE -n $APP_NAME"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-twitterid -n $APP_NAME || true && kubectl create secret generic $APP_NAME-twitterid --from-literal=APP_AUTH_TWITTER_ID=$APP_AUTH_TWITTER_ID -n $APP_NAME"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-twittersecret -n $APP_NAME || true && kubectl create secret generic $APP_NAME-twittersecret --from-literal=APP_AUTH_TWITTER_SECRET=$APP_AUTH_TWITTER_SECRET -n $APP_NAME"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-postgresqlhost -n $APP_NAME || true && kubectl create secret generic $APP_NAME-postgresqlhost --from-literal=APP_DB_HOST=$APP_PROD_DB_HOST -n $APP_NAME"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-postgresqlport -n $APP_NAME || true && kubectl create secret generic $APP_NAME-postgresqlport --from-literal=APP_DB_PORT=$APP_PROD_DB_PORT -n $APP_NAME"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-postgresqluser -n $APP_NAME || true && kubectl create secret generic $APP_NAME-postgresqluser --from-literal=APP_DB_USER=$APP_PROD_DB_USER -n $APP_NAME"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-postgresqlpassword -n $APP_NAME || true && kubectl create secret generic $APP_NAME-postgresqlpassword --from-literal=APP_PROD_DB_PASSWORD=$APP_DB_PASSWORD -n $APP_NAME"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-postgresqldatabase -n $APP_NAME || true && kubectl create secret generic $APP_NAME-postgresqldatabase --from-literal=APP_PROD_DB_NAME=$APP_DB_NAME -n $APP_NAME"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-postgresqlschema -n $APP_NAME || true && kubectl create secret generic $APP_NAME-postgresqlschema --from-literal=APP_DB_SCHEMA=$APP_PROD_DB_SCHEMA -n $APP_NAME"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-corswhitelist -n $APP_NAME || true && kubectl create secret generic $APP_NAME-corswhitelist --from-literal=APP_CORS_PROD_WHITELIST=$APP_CORS_PROD_WHITELIST -n $APP_NAME"'

                /* Enable this on cloud cluster with loadbalancer
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl delete secret $APP_NAME-tls -n $APP_NAME || true && kubectl create secret tls $APP_NAME-tls --cert=/etc/ssl/certs/$APP_NAME_DOMAIN.crt --key=/etc/ssl/certs/$APP_NAME_DOMAIN.key -n $APP_NAME"'
                sh '''APP_K8S_CODE=`cat $APP_NAME-k8s-cloud.yaml` && ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "
                cat << EOF | sudo tee -a $APP_NAME-k8s-cloud.yaml $APP_K8S_CODE
                "'''
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl apply -n $APP_NAME -f $APP_NAME-k8s-cloud.yaml"'*/

                sh '''APP_K8S_CODE=`cat $APP_NAME-k8s-baremetal.yaml` && ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "
                cat << EOF | sudo tee -a $APP_NAME-k8s-baremetal.yaml $APP_K8S_CODE
                "'''
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl apply -n $APP_NAME -f $APP_NAME-k8s-baremetal.yaml"'
                sh 'ssh k8s-master -l gsmcfdevops -i ~/.ssh/gsmcfdevops -o StrictHostKeyChecking=no "kubectl rollout restart deployment $APP_NAME -n $APP_NAME || true"'
            }
        }
        
    }
    post {
        // Clean after build
        always {
            cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: false,
                    notFailBuild: true,
                    patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                            [pattern: '.propsfile', type: 'EXCLUDE']])
        }
    }
}