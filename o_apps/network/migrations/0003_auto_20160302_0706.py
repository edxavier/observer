# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-02 07:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0002_auto_20160302_0619'),
    ]

    operations = [
        migrations.AlterField(
            model_name='node',
            name='cores',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='cpu',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='cpu_model',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='cpu_pcpu',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='cpu_proc_name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='cpu_proc_pcpu',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='hostname',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='k_release',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='kernel',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='load15',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='load5',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='machine',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='os',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='os_version',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='pos',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='processor',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='procs',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='ram',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='ram_prc',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='ram_top_pmem',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='ram_top_proc',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='sync_dif',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='uptime_seg',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='node',
            name='uptime_str',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
