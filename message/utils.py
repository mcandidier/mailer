from django.template import loader
from django.core.mail import EmailMessage
from django.conf import settings


from django.conf import settings

class Utils:

    @staticmethod
    def send_mail(subject, html_template,
                context,to_email):
        """
        Send a django.core.mail.EmailMessage to `to_email`.
        """

        html_template = 'auth/reset-password.html'
        html_message = loader.render_to_string(html_template, context)
        message = EmailMessage(subject, html_message, settings.EMAIL_HOST_USER, [to_email])
        message.content_subtype = 'html' # this is required because there is no plain text email message
        message.send()
