from django.views.decorators.http import require_GET
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse

@csrf_exempt
@require_GET
def GetToken(request):
    csrf = get_token(request)

    return JsonResponse(
        {"token": csrf},
        status=200,
        safe=True,
    )

@csrf_protect
def SendData(request):
    return