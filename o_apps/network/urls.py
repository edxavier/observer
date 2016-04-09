__author__ = 'edx'

from django.conf.urls import patterns, url
from .views import Hosts_detail
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views

network_patterns = [
    url(r'^host/(?P<id>\d+)/$',login_required(Hosts_detail.as_view()), name='host_detail'),
]
