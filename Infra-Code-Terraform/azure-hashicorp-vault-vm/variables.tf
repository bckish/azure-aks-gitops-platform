variable "rs-group-name" {}
variable "location" {}
variable "vnet-name" {}
variable "address-vn" {}
variable "subnet" {}
variable "subnet-address" {}
variable "sg-name" {}
variable "vm-name" {}
variable "vm-size" {}
variable "ip-name" {}
variable "nic-name" {}
variable "ssh_public_key" {
  type        = string
  description = "Operator-supplied SSH public key (not a private key)."
}
