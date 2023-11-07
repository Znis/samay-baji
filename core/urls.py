
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'core'
urlpatterns = [
    path('', views.index, name='core-index'),
    path('register/', views.register, name='core-signup'),
    path('signup/', views.registerUser, name='core-register'),
    path('core/order/', views.order, name='core-order'),
    path('feedback/', views.feedbackSubmission, name='core-feedback'),
    path('core/checkout/', views.checkout, name='core-checkout'),
    path('login/', views.handleLogin, name='core-login'),
    path('logout/', views.handleLogout, name='core-logout'),
    path('history/', views.showHistory, name='core-history'),
    path('loginsuccess/', views.loginSuccess, name='core-loginsuccess'),
    path('cancelorder/', views.orderCancel, name='core-ordercancel'),
    path('orderdelete/', views.orderDelete, name='core-orderdelete'),
    path('ordergf/', views.orderGF, name='core-ordergf'),
    path('ordermr/', views.orderMR, name='core-ordermr'),
    path('orderdetail/', views.orderDetail, name='core-orderdetail'),
   
    
    

]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)