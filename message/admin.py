from django.contrib import admin

from .models import Category, Message, MessageRecipient
 

# Register your models here.
class RecipientAdmin(admin.TabularInline):
    model = MessageRecipient

class MessageAdmin(admin.ModelAdmin):
    inlines = [
        RecipientAdmin
    ]

admin.site.register(Category)

admin.site.register(Message, MessageAdmin)
admin.site.register(MessageRecipient)
# admin.site.register(UserMessage, UserMessageAdmin)

