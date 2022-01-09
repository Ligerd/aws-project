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

az acr login --name jkorczauzrereg   

az acr show --name jkorczauzrereg --query loginServer --output table

docker tag src_products jkorczauzrereg.azurecr.io/webshop/products:v1
docker push jkorczauzrereg.azurecr.io/webshop/products:v1

docker tag src_carts jkorczauzrereg.azurecr.io/webshop/carts:v1
docker push jkorczauzrereg.azurecr.io/webshop/carts:v1

docker tag src_order_details   jkorczauzrereg.azurecr.io/webshop/order_details:v1
docker push jkorczauzrereg.azurecr.io/webshop/order_details:v1

docker tag src_deliveries jkorczauzrereg.azurecr.io/webshop/deliveries:v1
docker push jkorczauzrereg.azurecr.io/webshop/deliveries:v1

docker tag src_orders jkorczauzrereg.azurecr.io/webshop/orders:v1
docker push jkorczauzrereg.azurecr.io/webshop/orders:v1

docker tag src_customers jkorczauzrereg.azurecr.io/webshop/customers:v1
docker push jkorczauzrereg.azurecr.io/webshop/customers:v1


az acr repository list --name jkorczauzrereg.azurecr.io --output table

az container create \
  --resource-group WebShop\
  --name customers\
  --image jkorczauzrereg.azurecr.io/webshop/customers:v1\
  --cpu 1\
  --memory 1\
  --ports 80\
  --vnet webShopVNet \
  --subnet myACISubnet\
  --registry-login-server jkorczauzrereg.azurecr.io\
  --registry-username jkorczauzrereg\
  --registry-password +KOepV3qOTBhe8yxzB5VQf6FsfRVU1tq

az container create \
  --resource-group WebShop\
  --name customers\
  --image jkorczauzrereg.azurecr.io/webshop/customers:v1\
  --cpu 1\
  --memory 1\
  --ports 80\
  --dns-name-label webshopcustomers\
  --registry-login-server jkorczauzrereg.azurecr.io\
  --registry-username jkorczauzrereg\
  --registry-password +KOepV3qOTBhe8yxzB5VQf6FsfRVU1tq

jkorczauzrereg
+Kj+=PD3mWM0+lElhmm044K7gcUh3xPL

az container show \
  --name webshopcontainers --resource-group WebShop \
  --query ipAddress.ip --output tsv

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