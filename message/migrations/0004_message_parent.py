# Generated by Django 3.2.7 on 2021-10-14 15:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0003_message_timestamp'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='message.message'),
        ),
    ]
