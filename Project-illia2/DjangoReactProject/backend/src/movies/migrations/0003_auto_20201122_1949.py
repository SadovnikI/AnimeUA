# Generated by Django 3.1.3 on 2020-11-22 17:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0002_shadowmovie_shadowursls'),
    ]

    operations = [
        migrations.DeleteModel(
            name='ShadowMovie',
        ),
        migrations.DeleteModel(
            name='ShadowUrsls',
        ),
    ]