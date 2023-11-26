# Generated by Django 4.2.7 on 2023-11-26 09:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('artistsmgmt', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artist',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
        migrations.AlterField(
            model_name='portfolio',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='portfolio/'),
        ),
    ]
