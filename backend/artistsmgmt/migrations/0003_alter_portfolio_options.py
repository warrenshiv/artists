# Generated by Django 4.2.7 on 2023-12-05 20:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('artistsmgmt', '0002_alter_artist_options_alter_artistbio_options_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='portfolio',
            options={'verbose_name': 'Portfolio', 'verbose_name_plural': 'Portfolio'},
        ),
    ]
