from django.core.checks import messages
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
    # class Meta:
    #     ordering = ('-timestamp',)

    def __str__(self):
        return f'{self.title} - {self.sender}'

    @property
    def has_children(self, *args, **kwargs):
        return Message.objects.filter(parent=self).exists()

    @property
    def has_parent(self, *args, **kwargs):
        return True if self.parent else False

    def is_seen(self, *args, **kwargs):
        message = MessageRecipient.objects.get(message=self)
        return message.seen


class MessageRecipient(models.Model):
    message = models.ForeignKey(Message, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='inboxes')
    timestamp = models.DateTimeField(auto_now=True)
    seen = models.BooleanField(default=False)
    archive = models.BooleanField(default=False)


class Category(models.Model):
    """ category model for Messages
    """
    name = models.CharField(max_length=32)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)    
