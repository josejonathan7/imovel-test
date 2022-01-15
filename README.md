
# IMOVEL TESTE

## SÚMARIO

* sobre a aplicação
* sobre a imagem
* sobre as variaveis de ambiente


### SOBRE A APLICAÇÃO
Essa aplicação foi desenvolvida com o objetivo de treinar e aperfeiçoar habilidades em diversas tecnologias como jest e docker

### SOBRE A IMAGEM
a imagem foi construida com node instavel na versão 16, apesar de copiar todo o projeto a imagem só é executada com o docker compose isso porque o projeto usa typeorm e as migrações precisam ser executadas assim que o projeto inicia, e o banco só é iniciado no docker composer.

### SOBRE AS VÁRIAVEIS DE AMBIENTES

#### AMBIENTE DE TESTE
no .env.test

`SECRET_KEY=imovelTeste`

`BEDROOM=23d98b4c-413e-441b-b087-e6001b00c801`

`BATHROOM=40c8490c-8a7e-4c30-b15f-12ad7c5c63b2`

`YARD=fd18fdca-94d5-473e-a296-4de57c3bfe2e`

`KITCHEN=4f15db30-14e8-431e-b5f0-ac0f67f94560`

`LIVING_ROOM=19820e72-c8e9-4998-9f57-adb290e69f08`

como se trata do banco de testes essas informações ficaram fixas para não perder tempo configurando varivel de ambiente

#### AMBIENTE DE PRODUÇÃO
no .env

no ambiente de produção contém as mesmas variaveis de ambiente que no capitulo anterior com a diferença que seus valores precisam ser setados, é necessário fazer o inserte manualmente das categoria de produtos e atribuir o seu ID as suas respectivas variaveis, e a **SECRET_KEY** é a palavra passe do **TOKEN** do **JWBT**

as variaveis extra que o . env contém são

`DB_HOST=postgresDb`

`DB_PORT=5432`

`DB_USERNAME`

`DB_PASSWORD`

`DB_NAME`

a variavel **DB_HOST, e DB_PORT** devem permanecer inalteravel porque se refere ao nome do banco que esta no docker compose e a porta que foi setada, a **DB_USERNAME, DB_PASSWORD, e DB_NAME** são valores que são setados na primeira execução da imagem do container **postgres**



