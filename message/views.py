from re import search
from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework import serializers, viewsets, status
from rest_framework.response import Response

from .serializers import MessageSerializer, MessageRecipientSerializer
from .models import Message, MessageRecipient


class MessageViewSet(viewsets.ViewSet):
    """ Message viewset includes:
        create message
        list of messages
    """
    serializer_class = MessageSerializer

    def message_create(self, *args, **kwargs):
        serializer = self.serializer_class(data=self.request.data)
        if serializer.is_valid():
            message = serializer.save(sender=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def message_list(self, *args, **kwargs):
        # return list of created messages
        messages = Message.objects.filter(sender=self.request.user)
        serializer = self.serializer_class(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class MessageDetailViewSet(viewsets.ViewSet):
    """ Message Details includes:
        message detail,
        delete message
        update message
    """
    serializer_class = MessageSerializer


    def message_detail(self, *args, **kwargs):
        # return message detail
        message_id = kwargs.get('id')
        message = Message.objects.get(id=message_id)
        serializer = self.serializer_class(message)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete_message(self, *args, **kwargs):
        # delete selected message
        message_id = kwargs.get('id')
        message = Message.objects.get(id=message_id, sender=self.request.user)
        if 'delete' in self.request.data.get('action'):
            serializer = self.serializer_class(message)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({}, status=status.HTTP_400_BAD_REQUEST)
    
    def update_message(self, *args, **kwargs):
        # update selected message
        pass


class InboxViewSet(viewsets.ViewSet):
    """ Returns List of recieved messsages
    """
    serializer_class = MessageRecipientSerializer
    
    def inbox_list(self, *args, **kwargs):
        messages = MessageRecipient.objects.filter(user=self.request.user)
        serializer = self.serializer_class(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

