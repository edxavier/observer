# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-26 16:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='node',
            name='is_server',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='node',
            name='manufacturer',
            field=models.CharField(default='Sin datos', max_length=100),
        ),
        migrations.AddField(
            model_name='node',
            name='node_model',
            field=models.CharField(default='Sin datos', max_length=100),
        ),
        migrations.AddField(
            model_name='node',
            name='sector',
            field=models.CharField(default='operational', max_length=20),
        ),
        migrations.AddField(
            model_name='node',
            name='serial',
            field=models.CharField(default='Sin datos', max_length=100),
        ),
    ]