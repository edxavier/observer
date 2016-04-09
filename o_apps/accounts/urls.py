__author__ = 'edx'

from django.conf.urls import patterns, url
from .views import UserAccountData, ChangepasswordForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views

accounts_patterns = [
    url('^login/$', auth_views.login, {'template_name': 'login.html'}, name='login'),
    url('^logout/$', auth_views.logout_then_login, name='logout'),
    url(r'^user/(?P<id>\d+)/$',login_required(UserAccountData.as_view()), name='user_profile'),
    url(r'^change-password/$', login_required(ChangepasswordForm.as_view()), name='change_password'),
]
