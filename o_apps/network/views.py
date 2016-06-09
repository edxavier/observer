from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render
from django.views.generic import TemplateView
from django.shortcuts import render_to_response
from django.template import RequestContext

from observer.myhelpers import html_to_pdf
from .models import Node, NetworkNotification
from django.shortcuts import get_object_or_404

# Create your views here.
class Hosts(TemplateView):
    def get(self, request, *args, **kwargs):
        content_title = "Host"
        content_subtitle = "Estado de recursos en tiempo real"
        return render_to_response(
            'hosts.html', locals(), context_instance=RequestContext(request)
        )

# Create your views here.
class Hosts_as_aircon(TemplateView):
    def get(self, request, *args, **kwargs):
        content_title = "Formato Aircon 2100"
        content_subtitle = "Estado de recursos segun formato Aircon"
        hosts = Node.objects.all().order_by('id')
        return render_to_response(
            'aircon_table.html', locals(), context_instance=RequestContext(request)
        )

class Hosts_as_aircon_as_pdf(TemplateView):
    def get(self, request, *args, **kwargs):
        content_title = "Formato Aircon 2100"
        content_subtitle = "Estado de recursos segun formato Aircon"
        hosts = Node.objects.all().order_by('id')
        return html_to_pdf("aircon_table_as_pdf.html", locals())



class Hosts_detail(TemplateView):

    def get(self, request, id,  *args, **kwargs):
        host = get_object_or_404(Node, pk=id)
        content_title = "Detalles"
        content_subtitle = "Detalles e historial de uso de recursos del host"
        return render_to_response(
            'host_detail.html', locals(), context_instance=RequestContext(request)
        )

class Hosts_pdf_detail(TemplateView):

    def get(self, request, id,  *args, **kwargs):
        host = get_object_or_404(Node, pk=id)
        content_title = "Detalles"
        content_subtitle = "Detalles e historial de uso de recursos del host"
        return html_to_pdf("tecnical_details.html", locals())

class Hosts_charts(TemplateView):

    def get(self, request, id,  *args, **kwargs):
        host = get_object_or_404(Node, pk=id)
        content_title = "Graficos"
        content_subtitle = "Historial de uso de recursos del host"
        return render_to_response(
            'host_graphs.html', locals(), context_instance=RequestContext(request)
        )

class Hosts_notifications(TemplateView):

    def get(self, request, *args, **kwargs):
        content_title = "Notificaciones"
        content_subtitle = "Historial de notificaciones de hosts"

        notification_list = NetworkNotification.objects.all().order_by('-id')
        paginator = Paginator(notification_list, 10) # Show 20 notes per page
        page = request.GET.get('page')
        try:
            notifications = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            notifications = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            notifications = paginator.page(paginator.num_pages)

        return render_to_response(
            'notifications.html', locals(), context_instance=RequestContext(request)
        )