from django.urls import path, include

from .views import (
    MessageViewSet,
    InboxViewSet,
    MessageDetailViewSet,
    MessageReplyViewSet
)

urlpatterns = [
    path('', MessageViewSet.as_view({'post': 'message_create', 'get':'message_list'})),
    path('<int:id>/', MessageDetailViewSet.as_view({'post': 'delete_message', 'get':'message_detail'})),
    path('<int:id>/replies/', MessageReplyViewSet.as_view()),
    path('inbox/', InboxViewSet.as_view({'get':'inbox_list'})),
]