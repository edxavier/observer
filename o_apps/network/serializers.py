
__author__ = 'edx'
from rest_framework import serializers
from .models import Node, PerformanceHistory, NetworkNotification


class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Node
        #fields = ('id', 'username', 'first_name', 'last_name',)


class PerformanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformanceHistory


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = NetworkNotification