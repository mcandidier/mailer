from django.template.loader import get_template, render_to_string
from django.core.mail import EmailMessage
from django.conf import settings
from django.template import Context





from django.conf import settings

class Utils:

    @staticmethod
    def send_mail(subject, html_template,
                context,to_email):
        """
        Send a django.core.mail.EmailMessage to `to_email`.
        """

        print(context)

        html_message = render_to_string('auth/reset-password.html', context=context)
        message = EmailMessage(subject, html_message, settings.EMAIL_HOST_USER, [to_email])
        message.content_subtype = 'html' # this is required because there is no plain text email message
        message.send()
