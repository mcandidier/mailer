from django.db import models
from django.contrib.auth.models import User

from django.utils.translation import gettext_lazy as _


class Message(models.Model):
    """ message model structure
    """

    STATUS_TYPE = (
        (1, _('Draft')),
        (2, _('Sent')),
        (3, _('Failed'))
    )

    title = models.CharField(max_length=1024)
    recipient = models.ManyToManyField(User, through='MessageRecipient', related_name='inbox')
    message = models.TextField()
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages')
    status = models.PositiveSmallIntegerField(choices=STATUS_TYPE, default=1)
    archived = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now=True)
    parent = models.ForeignKey('self', blank=True, null=True, related_name='replies', on_delete=models.CASCADE)

    # category = models.ForeignKey('Category', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.title} - {self.sender}'


class MessageRecipient(models.Model):
    message = models.ForeignKey(Message, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)


class Category(models.Model):
    """ category model for Messages
    """
    name = models.CharField(max_length=32)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)    
