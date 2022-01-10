az network vnet create \
  --name webShopVNet \
  --resource-group WebShop \
  --location northeurope \
  --address-prefix 10.3.0.0/16 \
  --subnet-name myAGSubnet \
  --subnet-prefix 10.3.1.0/24

az network vnet subnet create \
  --name myACISubnet \
  --resource-group WebShop \
  --vnet-name webShopVNet   \
  --address-prefix 10.3.2.0/24

az network public-ip create \
  --resource-group WebShop \
  --name webShopPublicIPAddress \
  --allocation-method Static \
  --sku Standard

  ACI_IP=$(az container show \
  --name webshopcontainers \
  --resource-group WebShop \
  --query ipAddress.ip --output tsv)

az network application-gateway create \
  --name webShopAppGateway \
  --location northeurope \
  --resource-group WebShop \
  --capacity 2 \
  --sku Standard_v2 \
  --http-settings-protocol http \
  --public-ip-address myAGPublicIPAddress \
  --vnet-name webShopVNet \
  --subnet myAGSubnet \
  --servers "$ACI_IP"

az network public-ip show \
  --resource-group WebShop \
  --name myAGPublicIPAddress \
  --query [ipAddress] \
  --output tsv