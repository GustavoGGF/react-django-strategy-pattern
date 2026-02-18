# react-django-strategy-pattern

Full-stack integration service using React, Django, and GraphQL with strategy-based routing for MySQL and MongoDB.

# Clone o repositório

git clone https://github.com/GustavoGGF/react-django-strategy-pattern

cd react-django-strategy-pattern

# Entre na pasta de infraestrutura

cd Docker

# Suba os containers

docker compose up -d

# Leitura dos Dados

Para conferir a inserção dos dados no MYSQL utilize o comando:
docker exec -it mysql_macapa mysql -u root -proot -e "SELECT \* FROM macapa.contacts;"

Para conferir a inserção dos dados no MongoDB utilize o comando:
docker exec -it mongodb_varejao mongosh -u admin -p password --eval "db.getSiblingDB('varejao').contacts.find().pretty()"

# Melhorias Futuras & Escalabilidade

Embora o projeto cumpra os requisitos funcionais e utilize o Strategy Pattern para flexibilidade de bancos de dados, os seguintes pontos foram identificados como evoluções naturais para um ambiente de produção:

1. Persistência de Dados e Segurança
   Volumes Nomeados (Named Volumes): Implementar persistência robusta utilizando volumes gerenciados pelo Docker para garantir a integridade dos dados entre reinicializações, evitando conflitos de permissões em sistemas de arquivos host (especialmente em ambientes Windows/WSL2).

Gestão de Segredos (.env): Migrar as credenciais de banco de dados e chaves de API do docker-compose.yml para um arquivo .env (não versionado), seguindo as boas práticas do Twelve-Factor App.

2. Performance e Processamento Assíncrono
   Arquitetura de Mensageria (RabbitMQ + Celery): Para lidar com volumes massivos de dados (big data), o processamento de importação deve ser movido para uma fila assíncrona. Isso evita o timeout da requisição HTTP e permite o processamento em background com controle de retentativas.

Cache de Resultados (Redis): Integrar Redis para armazenar metadados de processamento e resultados frequentes de consultas, reduzindo a carga direta nos motores MySQL e MongoDB.

3. Governança e Segurança da API
   Rate Limiting no GraphQL: Implementar decorators de limitação de taxa (Throttling) por IP ou por cliente, prevenindo ataques de negação de serviço (DoS) e garantindo o uso justo dos recursos da infraestrutura.

Validação de Esquema Avançada: Adicionar camadas de validação de dados mais rigorosas antes da execução das Mutations para garantir que apenas dados sanitizados cheguem aos serviços de banco.
