from django.shortcuts import render
from django.views.generic import TemplateView
from django.core.urlresolvers import reverse_lazy
from observer.myhelpers import html_to_pdf
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template.context import RequestContext



# Create your views here.


class PermisoPDF(TemplateView):
    def get(self, request):
        return html_to_pdf('permisoPDF.html', locals())

class VacacionesPDF(TemplateView):
    def get(self, request):
        return render_to_response('vacacionesFrm.html', locals(),context_instance=RequestContext(request))

    def post(self,request,*args,**kwargs):
        nombres = request.POST['nombres']
        cargo = request.POST['cargo']
        codigo = request.POST['codigo']
        ubicacion = request.POST['ubicacion']
        dias = request.POST['dias']

        desde_dia = request.POST['desde_dia']
        desde_mes = request.POST['desde_mes']
        desde_anio = request.POST['desde_anio']
        hasta_dia = request.POST['hasta_dia']
        hasta_mes = request.POST['hasta_mes']
        hasta_anio = request.POST['hasta_anio']
        presentarse_dia = request.POST['presentarse_dia']
        presentarse_mes = request.POST['presentarse_mes']
        presentarse_anio = request.POST['presentarse_anio']
        periodo_mes_inicio = request.POST['periodo_mes_inicio']
        periodo_mes_fin = request.POST['periodo_mes_fin']
        periodo_anio = request.POST['periodo_anio']
        observacion = request.POST['observacion']


        return html_to_pdf('vacacionesPDF.html', locals())

