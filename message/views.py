from django.contrib.auth.forms import PasswordChangeForm
from django.shortcuts import render
from django.contrib.auth.models import User
from django.utils.http import (
    url_has_allowed_host_and_scheme, urlsafe_base64_decode,
)
from django.contrib.auth.tokens import default_token_generator


from rest_framework import serializers, views, viewsets, status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated



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
        # get all message replies
        message_id = kwargs.get('id')
        message = Message.objects.get(id=message_id)
        if message.parent:
            message = message.parent
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
    
    def post(self, args, **kwargs):
        # reply to message
        message_id = kwargs.get('id')
        message = Message.objects.get(id=message_id)
        serializer = self.serializer_class(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class MessageReplyViewSet(generics.GenericAPIView):
    serializer_class = MessageSerializer
 
    def get(self, *args, **kwargs):
        # get all message replies
        message_id = kwargs.get('id')
        message = Message.objects.get(id=message_id)
        if message.parent:
            message = message.parent
        replies = Message.objects.filter(parent=message)
        serializer = self.serializer_class(replies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class InboxViewSet(viewsets.ViewSet):
    """ Returns List of recieved messsages
    """
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer
    
    def inbox_list(self, *args, **kwargs):
        q1 = self.request.user.inbox.all()
        # qs = MessageRecipient.objects.filter(
        #     user=self.request.user).values_list('message')
        # messages = Message.objects.filter(id__in=[qs])
        serializer = self.serializer_class(q1, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)