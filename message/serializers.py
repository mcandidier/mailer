from rest_framework import serializers
from rest_framework.fields import ReadOnlyField

from django.contrib.auth.models import User
from drf_registration.api.user import UserSerializer

from .models import Message, MessageRecipient


class MessageSerializer(serializers.ModelSerializer):
    """ Message model serializer
    """
    recipients = serializers.ListField(child=serializers.CharField(), write_only=True)

    class Meta:
        model = Message
        fields = ['id', 'title', 'message', 'status', 'recipients', 'recipient', 'archived']
        read_only_fields = ['sender', 'recipient']

    def create(self, validate_data):
        recipients = validate_data.pop('recipients')
        message = Message.objects.create(**validate_data)
        for user_id in recipients:
            try: 
                user = User.objects.get(id=user_id)
                message.recipient.add(user)
            except User.DoesNotExist:
                pass
        return message


class MessageRecipientSerializer(serializers.ModelSerializer):
    message = MessageSerializer(read_only=True)

    class Meta:
        model = MessageRecipient
        fields = ('__all__')