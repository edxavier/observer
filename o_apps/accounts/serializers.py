
__author__ = 'edx'
from rest_framework import serializers
from o_apps.accounts.models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id', 'username', 'first_name', 'last_name',)
