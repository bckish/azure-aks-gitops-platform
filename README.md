# Azure AKS GitOps platform

Portfolio lab maintained in [bckish/azure-aks-gitops-platform](https://github.com/bckish/azure-aks-gitops-platform). The implementation is derived from upstream work; this repository's documentation and validation changes do not imply an independently verified cloud deployment.

A three-tier React/Node/MongoDB learning platform with Azure Terraform roots, GitLab CI examples, Kubernetes manifests and Flux configuration.

![Upstream architecture illustration](assets/Azure-Three-Tier.gif)

## Repository map

- [Infra-Code-Terraform](Infra-Code-Terraform/): separate AKS, GitLab VM and Vault VM roots.
- [Source-Code-Build](Source-Code-Build/): frontend and backend, Dockerfiles, npm lockfiles and GitLab CI examples.
- [Kubernetes-Manifests](Kubernetes-Manifests/): workload and Flux manifests.

## Local validation (no Azure deployment)

```bash
git clone https://github.com/bckish/azure-aks-gitops-platform.git
cd azure-aks-gitops-platform
node --check Source-Code-Build/backend/index.js
for root in Infra-Code-Terraform/azure-*; do
  terraform -chdir="$root" init -backend=false && terraform -chdir="$root" validate || exit 1
done
```

Dependencies and Terraform providers require network access. For deployment, supply your own Azure subscription, storage backend, SSH public key, GitLab runners and masked variables, Vault roles, registry and image references. The Flux repository and credentials must point to your own GitOps repository with matching paths. The included GitLab files represent separate pipeline roots; review them before importing. Application pipelines use lockfile installs and block on image scan findings; registry publication is manual. Manifest updates should be proposed separately in your own GitOps repository, not pushed to an inherited repository. Do not execute their manual apply/destroy jobs against a shared environment. No Azure infrastructure is deployed by the local checks.

See the original [architecture walkthrough](https://medium.com/@amanpathakdevops/advanced-end-to-end-devsecops-kubernetes-three-tier-project-using-azure-aks-fluxcd-prometheus-cca3c5e61953).

## Attribution and license

Original implementation by Aman Pathak. See [UPSTREAM.md](UPSTREAM.md) for the source repository and [LICENSE](LICENSE) (Apache-2.0). The upstream license and copyright notices are unchanged.
## Local application demo (no cloud or database required)

Use Node 22.12+ (or newer compatible Node). Run the backend with an explicit temporary in-memory store; task data is lost when the process exits. Set MONGO_CONN_STR instead of LOCAL_MEMORY for a real local MongoDB connection.

```bash
cd Source-Code-Build/backend
npm ci
npm test
LOCAL_MEMORY=true npm start
```

In a second terminal, from the repository root:

```bash
cd Source-Code-Build/frontend
npm ci
npm start
```

The UI defaults to http://127.0.0.1:3500/api/tasks in local mode. Set REACT_APP_BACKEND_URL when deploying it elsewhere. No cloud deployment is performed.
