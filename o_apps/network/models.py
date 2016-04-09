from __future__ import unicode_literals
from django.db import models
# Create your models here.


class Node(models.Model):

    ip = models.GenericIPAddressField(unique=True)
    hostname = models.CharField(max_length=20, blank=True, null=True)
    pos = models.CharField(max_length=20, blank=True, null=True)
    cores = models.PositiveIntegerField(blank=True, null=True)
    ram = models.PositiveIntegerField(blank=True, null=True)
    os_version = models.CharField(max_length=50, blank=True, null=True)
    kernel = models.CharField(max_length=50, blank=True, null=True)
    k_release = models.CharField(max_length=50, blank=True, null=True)
    processor = models.CharField(max_length=50, blank=True, null=True)
    os = models.CharField(max_length=50, blank=True, null=True)
    cpu_model = models.CharField(max_length=50, blank=True, null=True)
    platform = models.CharField(max_length=50, blank=True, null=True)

    # Datos de rendimiento
    partition = models.CharField(max_length=50, blank=True, null=True)
    part_usage = models.FloatField(blank=True, null=True)

    procs = models.PositiveIntegerField(blank=True, null=True)
    load5 = models.FloatField(blank=True, null=True)
    load15 = models.FloatField(blank=True, null=True)

    ram_prc = models.FloatField(blank=True, null=True)
    cpu_pcpu = models.FloatField(blank=True, null=True)
    sync_dif = models.CharField(blank=True, null=True, max_length=50)
    uptime_seg = models.FloatField(blank=True, null=True)
    uptime_str = models.CharField(max_length=50, blank=True, null=True)

    ram_top_proc = models.CharField(max_length=200, blank=True, null=True)
    ram_top_pmem = models.FloatField(blank=True, null=True)

    cpu_proc_name = models.CharField(max_length=200, blank=True, null=True)
    cpu_proc_pcpu = models.FloatField(blank=True, null=True)

    connected = models.BooleanField(default=True)

    def __unicode__(self):
        return self.ip


class PerformanceHistory(models.Model):

    partition = models.CharField(max_length=50, blank=True, null=True)
    part_usage = models.FloatField(blank=True, null=True)
    node = models.ForeignKey(Node)
    procs = models.PositiveIntegerField(blank=True)
    load5 = models.FloatField(blank=True)
    load15 = models.FloatField(blank=True)

    ram_prc = models.FloatField(blank=True)
    cpu_pcpu = models.FloatField(blank=True)

    uptime_seg = models.FloatField(blank=True)
    uptime_str = models.CharField(max_length=50, blank=True)

    ram_top_proc = models.CharField(max_length=200, blank=True)
    ram_top_pmem = models.FloatField(blank=True)

    cpu_proc_name = models.CharField(max_length=200, blank=True)
    cpu_proc_pcpu = models.FloatField(blank=True)

    created = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return str(self.ram_prc)


class NotificationType(models.Model):
    name = models.CharField(max_length=200, blank=True)


class NetworkNotification(models.Model):

    node = models.ForeignKey(Node)
    type = models.ForeignKey(NotificationType)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)


