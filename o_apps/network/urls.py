__author__ = 'edx'

from django.conf.urls import patterns, url
from .views import Hosts_detail, Hosts_notifications, Hosts_charts, Hosts_pdf_detail, Hosts_as_aircon, Hosts_as_aircon_as_pdf
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views

network_patterns = [
    url(r'^host/(?P<id>\d+)/details/$',login_required(Hosts_detail.as_view()), name='host_detail'),
    url(r'^host/(?P<id>\d+)/graphs/$', login_required(Hosts_charts.as_view()), name='host_graphs'),
    url(r'^host/(?P<id>\d+)/report_detail/$', login_required(Hosts_pdf_detail.as_view()), name='host_report'),
    url(r'^notifications/$', login_required(Hosts_notifications.as_view()), name='host_notification'),
    url(r'^as_aircon/$', login_required(Hosts_as_aircon.as_view()), name='hosts_aircon'),
    url(r'^as_aircon_pdf/$', login_required(Hosts_as_aircon_as_pdf.as_view()), name='hosts_aircon_pdf'),
]
