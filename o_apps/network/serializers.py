
__author__ = 'edx'
from rest_framework import serializers
from .models import Node, PerformanceHistory, NetworkNotification


class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Node
        #fields = ('id', 'username', 'first_name', 'last_name',)


class PerformanceSerializer(serializers.ModelSerializer):
    humanise_date = serializers.ReadOnlyField(source='get_formated_date')
    cores = serializers.ReadOnlyField(source='get_cores')

    class Meta:
        model = PerformanceHistory


class NotificationSerializer(serializers.ModelSerializer):
    pos = serializers.ReadOnlyField(source='node.pos')
    hostname = serializers.ReadOnlyField(source='node.hostname')
    ip = serializers.ReadOnlyField(source='node.ip')

    class Meta:
        model = NetworkNotification