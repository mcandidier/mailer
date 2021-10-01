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

    def __str__(self):
        return f'{self.title} - {self.sender}'


class MessageRecipient(models.Model):
    message = models.ForeignKey(Message, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)
