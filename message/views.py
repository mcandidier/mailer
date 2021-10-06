from django.contrib.auth.forms import PasswordChangeForm
from django.shortcuts import render
from django.contrib.auth.models import User
from django.utils.http import (
    url_has_allowed_host_and_scheme, urlsafe_base64_decode,
)
from django.contrib.auth.tokens import default_token_generator


from rest_framework import serializers, viewsets, status, generics
from rest_framework.response import Response


from .serializers import (
    MessageSerializer,
    MessageRecipientSerializer,
    ResetPasswordSerializer,
    ChangePasswordSerializer, 
)

from .models import Message, MessageRecipient


class ResetPasswordVerifyToken(generics.GenericAPIView):
    token_generator = default_token_generator
    user = None
    serializer_class = ChangePasswordSerializer

    def dispatch(self, *args, **kwargs):
        token = kwargs.get('token')
        uidb64 = kwargs.get('uidb64')
        uid = urlsafe_base64_decode(uidb64).decode()
        try: 
            user = User.objects.get(pk=uid)
            if self.token_generator.check_token(user, token):
                self.user = user
        except User.DoesNotExist:
            return super().dispatch(*args, **kwargs)
        return super().dispatch(*args, **kwargs)

    def get(self, *args, **kwargs):
        print('get')
        # verify reset password token
        if self.user is not None:
            return Response({'success': 'Reset password token was verified.'}, status=status.HTTP_200_OK)
        return Response({'error': 'Reset password token is invalid'}, status=status.HTTP_400_BAD_REQUEST)
      
    def post(self, *args, **kwargs):
        if self.user is not None:
            serializer = self.serializer_class(data=self.request.data, context={'user': self.user})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'success': 'Reset password changed successfully.'}, status=status.HTTP_200_OK)
        return Response({'error': 'Reset password token is invalid'}, status=status.HTTP_400_BAD_REQUEST)



class ResetPasswordView(generics.GenericAPIView):

    serializer_class  = ResetPasswordSerializer
    
    def post(self, *args, **kwargs):
        serializer = self.serializer_class(data=self.request.data, request=self.request)
        serializer.is_valid(raise_exception=True)
        return Response({'success': 'Reset password email successfully sent.'}, status=status.HTTP_200_OK)


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

