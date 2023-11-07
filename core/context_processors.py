
from django.shortcuts import get_object_or_404, render
from .models import Menu, HomePage, Order, FeedBack
from django.core import serializers


context = {
        'homepageDetail':HomePage.objects.all(),
        'menuItem':Menu.objects.all(),
        'menuItemId':serializers.serialize("json", Menu.objects.all())


    }
def add_variable_to_context(request):
    return context