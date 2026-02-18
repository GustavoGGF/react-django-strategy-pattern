import graphene
from services import MacapaService, VarejaoService

# 1. formato exato que o seu JSON do Frontend possui
class ContactInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    cellphone = graphene.String(required=True) 
    email = graphene.String() 

# 2. Mutation vai retornar para o React
class ImportContactsMutation(graphene.Mutation):
    class Arguments:
        contacts = graphene.List(ContactInput, required=True)
        # uma flag opcional para identificar se é manual
        is_manual = graphene.Boolean(default_value=False)

    success = graphene.Boolean()
    message = graphene.String()

    def mutate(self, info, contacts, is_manual):
        print("Caiu no Schemma.py com os contatos: ", contacts)
        # Seleção do Service (Macapá ou Varejão) via Header ou parâmetro
        request = info.context
        
        client_id = request.META.get('HTTP_X_CLIENT_ID', 'macapa')
        
        service = MacapaService() if client_id == 'macapa' else VarejaoService()

        try:
            # O service processa a lista (seja com 1 ou 1000 itens)
            service.import_contacts(contacts)
            
            origem = "Manual" if is_manual else "Arquivo"
            return ImportContactsMutation(
                success=True, 
                message=f"Sucesso! {len(contacts)} contato(s) via {origem} inserido(s)."
            )
        except Exception as e:
            return ImportContactsMutation(success=False, message=str(e))

# 3. Unifica tudo no Schema global
class Mutation(graphene.ObjectType):
    import_contacts = ImportContactsMutation.Field()

class Query(graphene.ObjectType):
    ping = graphene.String()
    def resolve_ping(self, info):
        return "pong"

schema = graphene.Schema(query=Query, mutation=Mutation)