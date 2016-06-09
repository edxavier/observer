"""observer URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.decorators import login_required

from o_apps.accounts.urls import accounts_patterns
from o_apps.network.urls import network_patterns
from o_apps.horario.urls import horario_patterns
from o_apps.formats.urls import formats_patterns
from o_apps.network import views
from django.conf import settings
from django.conf.urls.static import static

from observer.api_urls import router

urlpatterns = [
    url(r'^$', login_required(views.Hosts.as_view()), name='home'),
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^accounts/', include(accounts_patterns)),
    url(r'^network/', include(network_patterns)),
    url(r'^horario/', include(horario_patterns)),

    url(r'^formats/', include(formats_patterns)),
]


if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
