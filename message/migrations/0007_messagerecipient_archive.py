# Generated by Django 3.2.7 on 2021-10-19 07:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0006_messagerecipient_seen'),
    ]

    operations = [
        migrations.AddField(
            model_name='messagerecipient',
            name='archive',
            field=models.BooleanField(default=False),
        ),
    ]
