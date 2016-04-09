# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-02 17:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0004_auto_20160302_1716'),
    ]

    operations = [
        migrations.AddField(
            model_name='node',
            name='part_usage',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='node',
            name='partition',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]