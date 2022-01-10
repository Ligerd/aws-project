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

# az container create \
#   --resource-group WebShop\
#   --name customers\
#   --image jkorczauzrereg.azurecr.io/webshop/customers:v1\
#   --cpu 1\
#   --memory 1\
#   --ports 80\
#   --vnet webShopVNet \
#   --subnet myACISubnet\
#   --registry-login-server jkorczauzrereg.azurecr.io\
#   --registry-username jkorczauzrereg\
#   --registry-password +KOepV3qOTBhe8yxzB5VQf6FsfRVU1tq

az container create \
  --resource-group WebShop\
  --name carts\
  --image jkorczauzrereg.azurecr.io/webshop/carts:v1\
  --cpu 1\
  --memory 1\
  --ports 80\
  --dns-name-label webshopcarts\
  --registry-login-server jkorczauzrereg.azurecr.io\
  --registry-username jkorczauzrereg\
  --registry-password $AZUREREG_PASSWORD


az container show \
  --name webshopcontainers --resource-group WebShop \
  --query ipAddress.ip --output tsv


# frontend

cd frontend
docker-compose build
docker tag src_products jkorczauzrereg.azurecr.io/webshop/products:v1
docker push jkorczauzrereg.azurecr.io/webshop/products:v1

