# Generated by Django 3.1.3 on 2020-11-18 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_page', '0003_auto_20201118_1502'),
    ]

    operations = [
        migrations.CreateModel(
            name='VideoName',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=160, verbose_name='Name')),
                ('video', models.FileField(default=None, upload_to='', verbose_name='Video')),
            ],
            options={
                'verbose_name': 'Video name',
                'verbose_name_plural': 'Video names',
            },
        ),
        migrations.RenameField(
            model_name='movie',
            old_name='bucket_id',
            new_name='bucket_name',
        ),
        migrations.RemoveField(
            model_name='movie',
            name='key_id',
        ),
        migrations.DeleteModel(
            name='Bucket_key',
        ),
        migrations.AddField(
            model_name='movie',
            name='video_name',
            field=models.ManyToManyField(to='main_page.VideoName', verbose_name='Bucket_key'),
        ),
    ]
