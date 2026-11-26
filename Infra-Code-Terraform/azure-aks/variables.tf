variable "rs-group-name" {}
variable "location" {}
variable "ssh_key" {
  sensitive = true
}
variable "cluster-name" {}
variable "acr-name" {}
variable "acr-name2" {}
variable "aks_client_id" {
  type        = string
  description = "AKS service principal client ID from an approved secret-injection workflow."
  sensitive   = true
}
variable "aks_client_secret" {
  type        = string
  description = "AKS service principal secret; protect Terraform state because the provider stores it."
  sensitive   = true
}
