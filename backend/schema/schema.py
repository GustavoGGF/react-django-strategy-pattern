import graphene
from services import MacapaService, VarejaoService

# 1. formato exato que o seu JSON do Frontend possui
class ContactInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    cellphone = graphene.String(required=True) # Nome exato da chave no seu JSON
    email = graphene.String() # Opcional, aceita null se não vier no arquivo

# 2. Mutation vai retornar para o React
class ImportContactsMutation(graphene.Mutation):
    class Arguments:
        # Recebe a lista de contatos do JSON
        contacts = graphene.List(ContactInput, required=True)

    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, contacts):
        # identificador direto do header da requisição
        client_id = info.context.headers.get('X-Client-Id')

        if client_id == 'varejao':
            service = VarejaoService() 
        elif client_id == 'macapa':
            service = MacapaService()
        
        service.import_contacts(contacts)
        return ImportContactsMutation(success=True)

# 3. Unificam tudo no Schema global
class Mutation(graphene.ObjectType):
    import_contacts = ImportContactsMutation.Field()

class Query(graphene.ObjectType):
    ping = graphene.String()
    def resolve_ping(self, info):
        return "pong"

schema = graphene.Schema(query=Query, mutation=Mutation)