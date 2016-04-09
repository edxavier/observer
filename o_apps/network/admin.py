from django.contrib import admin
from .models import Node, NotificationType, NetworkNotification, PerformanceHistory
# Register your models here.
admin.site.register(Node)
admin.site.register(NotificationType)
admin.site.register(NetworkNotification)
admin.site.register(PerformanceHistory)