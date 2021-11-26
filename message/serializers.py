from rest_framework import serializers
from rest_framework.fields import ReadOnlyField

from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.utils.translation import gettext_lazy as _


from django.contrib.sites.shortcuts import get_current_site

from drf_registration.api.user import UserSerializer

from .models import Message, MessageRecipient
from .utils import Utils

from django.conf import settings


class MessageSerializer(serializers.ModelSerializer):
    """ Message model serializer
    """
    recipients = serializers.ListField(child=serializers.CharField(), write_only=True)
    sender = serializers.SerializerMethodField(read_only=True)
    receiver = serializers.SerializerMethodField(read_only=True)

    def get_receiver(self, obj):
        return obj.sender.username

    def get_sender(self, obj):
        return obj.sender.id

    class Meta:
        model = Message
        fields = ['id', 'title',
                'message', 'status', 'recipients',
                'recipient', 'archived','sender', 
                'timestamp', 'parent', 'status', 'receiver']
        read_only_fields = ['sender', 'recipient', 'timestamp']

    def create(self, validate_data):
        recipients = validate_data.pop('recipients')
        message = Message.objects.create(**validate_data)
        for email in recipients:
            try: 
                user = User.objects.get(email=email)
                message.recipient.add(user)
            except User.DoesNotExist:
                pass
        return message


class MessageRecipientSerializer(serializers.ModelSerializer):
    message = MessageSerializer(read_only=True)

    class Meta:
        model = MessageRecipient
        fields = ('__all__')


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True)
    request = None

    def __init__(self, **kwargs):
        self.request = kwargs.pop('request')
        super().__init__(**kwargs)

    def validate(self, attrs):
        
        if 'email' in attrs:
            email = attrs.get('email')
            user = User.objects.filter(email=email)

            if user.exists():
                user_obj  = user.first()
                current_site = get_current_site(self.request)
                context = {
                    'token': default_token_generator.make_token(user_obj),
                    'uid': urlsafe_base64_encode(force_bytes(user_obj.pk)),
                    'domain': current_site.domain,
                }

                Utils().send_mail('Reset Password', 'auth/reset-password.html', context, user_obj.email)
        return super().validate(attrs)


class ChangePasswordSerializer(serializers.Serializer):

    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        password = attrs.get('password')
        confirm_password = attrs.get('confirm_password')
        if password != confirm_password:
            raise serializers.ValidationError({'confirm_password': _("Password didn't match.")})
        return super().validate(attrs)

    def save(self, **kwargs):
        password = self.validated_data.get('password')
        user = self.context['user']
        user.set_password(password)
        user.save
        return user


class MessageRecipientSerializer(serializers.ModelSerializer):
    message = MessageSerializer()

    class Meta:
        model = MessageRecipient
        fields = ['id','message', 'user', 'seen', 'archive']