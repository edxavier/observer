import django_filters

from o_apps.network.models import Node, NetworkNotification, PerformanceHistory
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import NodeSerializer, PerformanceSerializer, NotificationSerializer
from rest_framework import status
__author__ = 'edx'

class NodesFilter(django_filters.FilterSet):
    #min_date = django_filters.DateFilter(name="created_at", lookup_type='gte')
    #max_date = django_filters.DateFilter(name="created_at", lookup_type='lte')
    #description = django_filters.CharFilter(name="description", lookup_type='icontains')

    class Meta:
        model = Node
        fields = ['ip',]

class PerformanceFilter(django_filters.FilterSet):
    min_date = django_filters.DateFilter(name="created", lookup_type='gte')
    max_date = django_filters.DateFilter(name="created", lookup_type='lte')


    class Meta:
        model =  PerformanceHistory
        fields = ['min_date', 'max_date', 'node']



class NodeViewSet(viewsets.ModelViewSet):
    serializer_class = NodeSerializer
    queryset = Node.objects.all().order_by('id')
    filter_fields = ('ip', )
    filter_class = NodesFilter

    def update(self, request, *args, **kwargs):
        obj = self.get_object()
        serializer = NodeSerializer(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print "ERROR INVALID"
            print serializer.errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PerformanceViewSet(viewsets.ModelViewSet):
    serializer_class = PerformanceSerializer
    queryset = PerformanceHistory.objects.all().order_by('id')
    filter_class = PerformanceFilter

"""
    def list(self, request, *args, **kwargs):
        queryset = Usuario.objects.all()
        dependency = self.request.query_params.get('dependency', None)
        if dependency is not None and len(dependency)>0:
            if dependency == '1':
                queryset = Usuario.objects.filter(groups__name__in=['torre'])
            else:
                queryset = Usuario.objects.filter(groups__name__in=['aproximacion'])
        serializer = UsuarioSerializer(queryset, many=True)
        return Response(serializer.data)

"""

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    queryset = NetworkNotification.objects.all().order_by('-id')
    filter_fields = ('id','viewed')

    def update(self, request, *args, **kwargs):
        obj = self.get_object()
        serializer = NotificationSerializer(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
