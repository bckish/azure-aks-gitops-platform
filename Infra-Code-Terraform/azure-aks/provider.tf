terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
}

provider "azurerm" {
  skip_provider_registration = "true"
  features {}
}

provider "vault" {
  address          = var.vault_address
  skip_child_token = true
  alias            = "approle"
  auth_login {
    path = "auth/approle/login"

    parameters = {
      role_id   = var.role_id
      secret_id = var.secret_id
    }
  }
}

provider "vault" {
  alias            = "main"
  address          = var.vault_address
  skip_child_token = true
}
