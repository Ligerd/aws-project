# db
docker exec -i postgreDB psql -U postgres online_shope < src/db/sql/db_creation.sql

docker exec -i postgreDB psql -U postgres online_shope < src/db/sql/insert_test_data.sql

docker exec -it postgreDB psql -U postgres online_shope

# logi
docker logs customers
