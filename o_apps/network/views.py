from django.shortcuts import render
from django.views.generic import TemplateView
from django.shortcuts import render_to_response
from django.template import RequestContext
from .models import Node
from django.shortcuts import get_object_or_404

# Create your views here.
class Hosts(TemplateView):
    def get(self, request, *args, **kwargs):
        return render_to_response(
            'hosts.html', locals(), context_instance=RequestContext(request)
        )

class Hosts_detail(TemplateView):

    def get(self, request, id,  *args, **kwargs):
        host = get_object_or_404(Node, pk=id)
        return render_to_response(
            'host_detail.html', locals(), context_instance=RequestContext(request)
        )