from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import re_path, path

from . import consumers

websocket_urlpatterns = [
    # re_path(r'ws/$', consumers.ChatConsumer.as_asgi()),
    re_path(r'ws/messages/$', consumers.MessageConsumer.as_asgi()),
]

# application = ProtocolTypeRouter({
#     'websocket': AuthMiddlewareStack(
#         URLRouter(
#             websocket_urlpatterns
#         )
#     ),
# })
