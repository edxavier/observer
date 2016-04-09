# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-02 05:13
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='NetworkNotification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Node',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ip', models.GenericIPAddressField()),
                ('hostname', models.CharField(blank=True, max_length=20)),
                ('pos', models.CharField(blank=True, max_length=20)),
                ('cores', models.PositiveIntegerField(blank=True)),
                ('ram', models.PositiveIntegerField(blank=True)),
                ('cpu', models.CharField(blank=True, max_length=50)),
                ('os_version', models.CharField(blank=True, max_length=50)),
                ('kernel', models.CharField(blank=True, max_length=50)),
                ('k_release', models.CharField(blank=True, max_length=50)),
                ('processor', models.CharField(blank=True, max_length=50)),
                ('os', models.CharField(blank=True, max_length=50)),
                ('cpu_model', models.CharField(blank=True, max_length=50)),
                ('machine', models.CharField(blank=True, max_length=50)),
                ('procs', models.PositiveIntegerField(blank=True)),
                ('load5', models.FloatField(blank=True)),
                ('load15', models.FloatField(blank=True)),
                ('ram_prc', models.FloatField(blank=True)),
                ('cpu_pcpu', models.FloatField(blank=True)),
                ('sync_dif', models.FloatField(blank=True)),
                ('uptime_seg', models.FloatField(blank=True)),
                ('uptime_str', models.CharField(blank=True, max_length=50)),
                ('ram_top_proc', models.CharField(blank=True, max_length=200)),
                ('ram_top_pmem', models.FloatField(blank=True)),
                ('cpu_proc_name', models.CharField(blank=True, max_length=200)),
                ('cpu_proc_pcpu', models.FloatField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='NotificationType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='PerformanceHistory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('procs', models.PositiveIntegerField(blank=True)),
                ('load5', models.FloatField(blank=True)),
                ('load15', models.FloatField(blank=True)),
                ('ram_prc', models.FloatField(blank=True)),
                ('cpu_pcpu', models.FloatField(blank=True)),
                ('uptime_seg', models.FloatField(blank=True)),
                ('uptime_str', models.CharField(blank=True, max_length=50)),
                ('ram_top_proc', models.CharField(blank=True, max_length=200)),
                ('ram_top_pmem', models.FloatField(blank=True)),
                ('cpu_proc_name', models.CharField(blank=True, max_length=200)),
                ('cpu_proc_pcpu', models.FloatField(blank=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('node', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='network.Node')),
            ],
        ),
        migrations.AddField(
            model_name='networknotification',
            name='node',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='network.Node'),
        ),
        migrations.AddField(
            model_name='networknotification',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='network.NotificationType'),
        ),
    ]