import graphene
from services import MacapaService, VarejaoService
import re

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
        request = info.context
        
        # 1. Sanitização do Client ID
        client_id = request.META.get('HTTP_X_CLIENT_ID', 'macapa')
        if not isinstance(client_id, str) or "[object]" in str(client_id):
            client_id = 'macapa'
        client_id = client_id.lower().strip()

        # 2. Filtragem de Contatos Válidos
        valid_contacts = []
        invalid_count = 0

        for contact in contacts:
            # Verifica se tem exatamente 13 dígitos numéricos
            if re.fullmatch(r'\d{13}', contact.cellphone):
                valid_contacts.append(contact)
            else:
                invalid_count += 1

        # 3. Verificação: Se nada sobrou após a filtragem
        if not valid_contacts:
            return ImportContactsMutation(
                success=False, 
                message="Nenhum contato válido foi encontrado. Verifique se os números possuem 13 dígitos."
            )

        # 4. Seleção do Service (Strategy Pattern)
        service = MacapaService() if client_id == 'macapa' else VarejaoService()

        try:
            # O service processa apenas os contatos que passaram no filtro
            service.import_contacts(valid_contacts)
            
            origem = "Manual" if is_manual else "Arquivo"
            
            # Montagem da mensagem de feedback
            msg = f"Sucesso! {len(valid_contacts)} inseridos via {origem} no {client_id.upper()}."
            if invalid_count > 0:
                msg += f" ({invalid_count} contatos ignorados por formato inválido)."

            return ImportContactsMutation(success=True, message=msg)
            
        except Exception as e:
            print(f"Erro na importação: {e}") 
            return ImportContactsMutation(success=False, message="Erro interno no servidor.")
            request = info.context
            
            # 1. Sanitização do Client ID (Evita o [object Object])
            client_id = request.META.get('HTTP_X_CLIENT_ID', 'macapa')
            if not isinstance(client_id, str) or "[object]" in str(client_id):
                client_id = 'macapa'
            client_id = client_id.lower().strip()

            # 2. Validação de Regra de Negócio (13 dígitos numéricos)
            # Fazemos aqui para dar um feedback imediato via GraphQL
            for contact in contacts:
                # Remove espaços ou caracteres especiais se existirem, mas o requisito é ser só números
                if not re.fullmatch(r'\d{13}', contact.cellphone):
                    return ImportContactsMutation(
                        success=False, 
                        message=f"Erro de validação: O número {contact.cellphone} deve ter exatamente 13 dígitos numéricos."
                    )

            # 3. Seleção do Service (Strategy Pattern)
            service = MacapaService() if client_id == 'macapa' else VarejaoService()

            try:
                # O service processa a lista validada
                service.import_contacts(contacts)
                
                origem = "Manual" if is_manual else "Arquivo"
                return ImportContactsMutation(
                    success=True, 
                    message=f"Sucesso! {len(contacts)} contato(s) inseridos via {origem} no banco {client_id.upper()}."
                )
            except Exception as e:
                # Log do erro real no servidor e mensagem amigável para o front
                print(f"Erro na importação: {e}") 
                return ImportContactsMutation(success=False, message="Erro interno ao processar a importação.")

# 3. Unifica tudo no Schema global
class Mutation(graphene.ObjectType):
    import_contacts = ImportContactsMutation.Field()

class Query(graphene.ObjectType):
    ping = graphene.String()
    def resolve_ping(self, info):
        return "pong"

schema = graphene.Schema(query=Query, mutation=Mutation)