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

## Backend
Do rozwoju części serwerowej wykorzystaliśmy język Python3 w wersji 3.8. Wykorzystano bibliotekę o nazwie **FastApi** do realizacji komunikacji z klientem poprzez protokół HTTP. Była to dla nas nowa i wcześniej nie wykorzystywana biblioteka co pozwaliło nam się zapoznać i rozwinąć nasze umiętności w web-developmencie. Do komunikacji z bazą PostgreSQL użyliśmy bibilioteki **SQLAlchemy** pozwaliła on nam w latwy sposób wykonywać żądania do bazy oraz parsować wyniki do struktur danych w języku python. 

Do orkestracji kontenerów zawięrających serwisy wykorzystano **Docker compose**. To narzędzie  pozwaliło nam w łatwy sposób zasymulować oraz przetestować działanie naszych serwisów  dokładnie w taki sposób jak to działa na platformie Azure. 

## Technologie:

### Konteneryzacja:
- Docker
- Docker compose

### Backend:
- Python3
- FastApi
- SQLAlchemy

### Frontend
- React
- TypeScript

### Baza danych
- PostgreSQL

## Wnioski
### Azure
Praca z platformą Azure jest raczej wygodna. Platforma posiada dobrą dokumentację oraz pozwala na wykorzystanie 100 dolarów studentom. Praca przez Portal Azure oraz interfejs az cli jest sprawna.

Problemami związanymi z platformą były najczęciej braki w integracji rozwiązań między sobą lub z systemem Linux (przykładowo narzędzia App Service Fabric, które rozważaliśmy). Dużo tutoriali napisane jest również z jednej perspektywy, nie tłumaczą one zasad działania, a jedynie wskazują jak stworzyć przykładowe rozwiązanie.

Należy również pamiętać, że zasoby na platformie Azure są dosyć kosztowne.

### Backend 
Podczas pracy nad serwisami nie napotkaliśmy się na jakieś duże problemy. Ze względu na to, że biblioteki **FastAPI** oraz **SQLAlchemy** mają olbrzymią dokumentację oraz dużą ilość przykładów w internecie.

### Frontend 
Aplikacja kliencka została przygotowana w oparaciu o popularną bibliotekę **React**. Składa się ona z 4 podstawowych widoków:
- Lista produktów - dostępna jest tylko dla zalogowanych użytkowników. Pozwala na dodawanie produktów do koszyka.
- Koszyk - przedstawia podsumowanie zamówienia oraz umożliwia jego złożenie.
- Lista zamówień - w przypadku zwykłych użytkowników przedstawia wszystkie złożone zamówienia wraz z ich stanem. Administratorzy widzą listę wszystkich zamówień w systemie.
- Szczegóły zamówienia - pozwalają zapoznać się ze wszelkimi informacjami takimi jak dane adresowe klienta oraz zamówione przedmioty. Administratorzy mogą z tego poziomu aktualizować stan zamówienia.
