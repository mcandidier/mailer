from django.urls import path, include

from .views import (
    MessageViewSet,
    InboxViewSet,
    MessageDetailViewSet,
)

urlpatterns = [
    path('', MessageViewSet.as_view({'post': 'message_create', 'get':'message_list'})),
    path('<int:id>/', MessageDetailViewSet.as_view({'post': 'delete_message', 'get':'message_detail'})),
    path('inbox/', InboxViewSet.as_view({'get':'inbox_list'})),
]