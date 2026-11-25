variable "rs-group-name" {}
variable "location" {}
variable "ssh_key" {
  sensitive = true
}
variable "cluster-name" {}
variable "acr-name" {}
variable "acr-name2" {}
variable "role_id" {}
variable "secret_id" {}
variable "vault_address" {
  type        = string
  description = "HTTPS address of the operator's Vault instance."
}
