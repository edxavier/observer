from django.conf.urls import patterns, include, url
from .views import *
from django.contrib.auth.decorators import login_required

formats_patterns = [

    url(r'^permiso/', login_required(PermisoPDF.as_view()), name='permisoPDF'),
    url(r'^vacaciones/', login_required(VacacionesPDF.as_view()), name='vacacionesPDF'),

]
