# Generated by Django 4.1.3 on 2022-11-25 09:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_product_is_featured'),
    ]

    operations = [
        migrations.AlterField(
            model_name='banner',
            name='img',
            field=models.ImageField(upload_to='banner_imgs'),
        ),
    ]
