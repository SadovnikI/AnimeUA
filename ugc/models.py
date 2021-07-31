from django.db import models


class Profile(models.Model):
    external_id = models.PositiveIntegerField(
        verbose_name='User ID'
    )
    name = models.TextField(
        verbose_name='User name'
    )

    class Meta:
        verbose_name = 'Profile'


class Message(models.Model):
    profile = models.ForeignKey(
        to='ugc.Profile',
        verbose_name='Profile',
        on_delete=models.PROTECT,
    )
    text = models.TextField(
        verbose_name='Text'
    )
    created_at = models.DateTimeField(
        verbose_name='Time',
        auto_now_add=True,
    )

    class Meta:
        verbose_name = 'Message'

