
__author__ = 'edx'
from rest_framework import routers
from o_apps.accounts.view_set import UserViewSet
from o_apps.network.view_set import NodeViewSet, PerformanceViewSet, NotificationViewSet

router = routers.DefaultRouter()
router.register(r'accounts/users', UserViewSet)
router.register(r'network/nodes', NodeViewSet)
router.register(r'network/performance_hist', PerformanceViewSet)
router.register(r'network/notification', NotificationViewSet)
