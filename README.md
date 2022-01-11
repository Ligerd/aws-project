# Sklep internetowy w chmurze AWS
## 1DI2226:A - Programowanie usług w chmurze, Projekt

Zespół w składzie:
- **Aleksandr Karolik** - backend + DB
- **Jakub Korczakowski** - azure
- **Piotr Jeleniewicz** - frontend
- **Piotr Rosa** - backend + DB

## Diagram architektury
![Alt text](docs/AzureDiagram.png?raw=true "Diagram architektury")

## Diagram przypadków użycia
![Alt text](docs/UseCasesCloud.png?raw=true "Diagram przypadków użycia")

## Użyte komponenty platformy Azure

Zdecydowaliśmy się na wdrożenie aplikacji poprzez użycie konteneryzacji dostępnej na Azure. Nasz wybór padł na środowisko Azure Container Instances. Zdecydowaliśmy się na środowisko kontenerowe ze względu na znajomość Dockera oraz łatwość wdrażania lokalnych zmian.

1. Azure Container Registry
Poszczególne obrazy zbudowane lokalnie załadowaliśmy do prywatnego rejestru kontenerów dostępnego pod adresem `jkorczauzrereg.azureacr.io`. Przychowywaliśmy tam obrazy mikroseriswów oraz obraz aplikacji frontendowej.

2. Azure Container Instances
Mikroserwisy wdrażaliśmy jako grupy kontenerów. Pozwoliło to na łatwą komunikację między serwisem Frontendowym, a Backendem.

3. Resource Groups
Do zarządzania projektem użyliśmy grup zasobów, ponieważ pozwalają one na logiczne powiązanie ze sobą elementów architektóry aplikacji.

4. Azure Database for PostgreSQL server
Użyliśmy bazy danych PostgreSQL, która jest udostępniana przez platformę Azure. Nasza baza danych została automatycznie utowrzona przez skrypty w języku Python.

Architekturę tworzyliśmy korzystając z Portalu Azure oraz interfejsu konsolowego **az cli**. W katalogu `src/azure/scripts` znajdują się skrypty oraz polecenia użyte podczas tworzenia architektury.

## Technologie:

### Konteneryzacja:
- Docker

### Backend:
- Python3
- FastApi
- SQLAlchemy

### Frontend
- React
- TypeScript
- 
### Baza danych
- PostgreSQL


http://webshopcarts.northeurope.azurecontainer.io/
http://webshopproducts.northeurope.azurecontainer.io/
http://webshoporderdetails.northeurope.azurecontainer.io/
http://webshopdeliveries.northeurope.azurecontainer.io/
http://webshoporders.northeurope.azurecontainer.io/
http://webshopcustomers.northeurope.azurecontainer.io/