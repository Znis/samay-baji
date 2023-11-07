from django.http import HttpResponseRedirect
from django.http import response
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.core.exceptions import ObjectDoesNotExist
from django.contrib import messages
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from .models import Menu, HomePage, Order, FeedBack
from django.contrib.auth import authenticate, login, logout
from django.core import serializers
import json


context = {
    'homepageDetail': HomePage.objects.all(),
    'menuItem': Menu.objects.all(),
    'menuItemId': serializers.serialize("json", Menu.objects.all())


}


def index(request):
    return render(request, 'core/index.html', context)


def register(request):
    return render(request, 'core/register.html', context)


def order(request):
    return render(request, 'core/order.html', context)


def registerUser(request):
    if request.user.is_authenticated:
        messages.error(
            request, 'You need to Logout first in order to register new user.')
        return redirect("/")
    else:
        if request.method == 'POST':
            name = request.POST.get('name', '').strip()
            email = request.POST.get('email', '').strip()
            pass1 = request.POST.get('pass1', '').strip()
            pass2 = request.POST.get('pass2', '').strip()
            country = request.POST.get('country', '').strip()
            phone_num = request.POST.get('phonenum', '').strip()

            if(pass1 == pass2):
                if not User.objects.filter(username=email).exists():
                    myuser = User.objects.create_user(email, name, pass1)
                    myuser.first_name = country
                    myuser.last_name = phone_num
                    myuser.save()
                    messages.success(
                        request, f'Account Created For <b>{name}</b> !')
                    return redirect('/')
                else:
                    messages.error(
                        request, f'Account with email <b>{email}</b> already exists!')
                    return redirect('/')

            else:
                messages.error(
                    request, f'Account Creation Failed For <b>{name}</b> !')
                return redirect('/')
        messages.error(request, 'Something Went Wrong! Please Try Again.')
        return redirect('/')


def checkout(request):
    if not request.user.is_authenticated:
        messages.error(
            request, 'You need to Login first in order to place an Order.')
        return redirect("/")
    else:
        if request.method == 'POST':
            itemsJson = ((((((request.POST.get('item-json', '').strip()).replace(',', ' ')).replace(
                '{', '')).replace('}', '')).replace('"', ' ')).replace(':', ' x')).title()
            totalAmt = request.POST.get('amt-total', '').strip()
            name = request.POST.get('fname', '').strip(
            ) + " " + request.POST.get('lname', '').strip()
            email = request.POST.get('email', '').strip()
            method = request.POST.get('method', '').strip()
            payment = request.POST.get('payment', '').strip()
            orderDate = request.POST.get('time', '').strip()
            phone = request.POST.get('phone', '').strip()
            address = request.POST.get('address', '').strip()
            date = request.POST.get('preorder-date', '').strip()
            time = request.POST.get('order-time', '').strip()
            noteToDriver = request.POST.get('note-to-driver', '').strip()
            order = Order(name=name, itemsJson=itemsJson, totalAmt=totalAmt, email=email, method=method,
                          payment=payment, orderDate=orderDate, phone='+977' + phone, address=address, date=date, time=time,
                          noteToDriver=noteToDriver, orderedBy=request.user.id)
            order.save()
            success = True
            id = order.orderId
            messages.success(
                request, f'Order Request Successful! The Order Tracker ID is: <i>SMBOI{id}</i>')
            return redirect('/')
        else:
            messages.error(request, 'Order Request Failed!')
            return redirect('/')


def feedbackSubmission(request):
    if request.method == 'POST':
        fname = request.POST.get('feedback-name', '').strip()
        femail = request.POST.get('feedback-email', '').strip()
        ftext = request.POST.get('feedback-text', '').strip()
        feedback = FeedBack(fname=fname, femail=femail, ftext=ftext)
        feedback.save()
        feedbackSubmitted = True
        messages.success(
            request, f'Feedback by <b>{fname}</b> is Submitted Successfully.')
        return redirect('/')
    else:
        messages.error(request, 'Feedback Submission Failed.')
        return redirect('/')


def handleLogin(request):
    if request.user.is_authenticated:
        messages.error(request, 'You need to Logout first in order to Login.')
        return redirect("/")
    else:

        if request.method == 'POST':

            username = request.POST['email-field'].strip()
            password = request.POST['password-field'].strip()
            keepmeloggedin = request.POST['keepmeloggedin']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                if (keepmeloggedin == 'false'):
                    request.session.set_expiry(0)
                return HttpResponse("SUCCESS")
            else:
                return HttpResponse("FAIL")

        messages.error(request, "Something Went Wrong. Could not Login!")
        return redirect("/")


def handleLogout(request):
    if request.user.is_authenticated:
        logout(request)
        messages.success(request, 'Logged Out Successfully!')
        return redirect("/")
    else:
        messages.error(
            request, 'You need to be Logged In first in order to Logout.')
        return redirect("/")


def showHistory(request):
    if request.user.is_authenticated:
        orderRecord = {
            'orderRecord': (Order.objects.filter(orderedBy=request.user.id)).order_by('-orderId')
        }
        for items in orderRecord['orderRecord']:
            if(items.orderStatus == "Validating Order" or items.orderStatus == "En Route"):
                activedoesExist = True
                orderRecord['activedoesExist'] = activedoesExist
                break
        for items in orderRecord['orderRecord']:
            if(items.orderStatus != "Validating Order" and items.orderStatus != "En Route"):
                doesExist = True
                orderRecord['doesExist'] = doesExist
                break

        return render(request, 'core/history.html', orderRecord)

    else:
        messages.error(
            request, 'You need to be Logged In first in order to access History page.')
        return redirect("/")


def loginSuccess(request):
    if request.user.is_authenticated:
        messages.success(request, "Logged In Successfully")
        return redirect("/")
    else:
        messages.error(request, "Something Went Wrong. Could not Login!")
        return redirect("/")


def orderCancel(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            orderid = (request.POST['id'].strip())[3::1]

            try:

                order = Order.objects.get(orderId=orderid)
                if(request.user.id == order.orderedBy):
                    order.orderStatus = 'Order Cancelled'
                    order.save()
                    return redirect("/history/")
                else:
                    messages.error(
                        request, "Something Went Wrong. You are not authorized to cancel this order !")
                    return redirect("/")

            except ObjectDoesNotExist:
                messages.error(
                    request, "Something Went Wrong. Could not cancel the non-existential order !")
                return redirect("/")

        else:
            messages.error(
                request, "Something Went Wrong. Could not cancel the order!")
            return redirect("/")
    else:
        messages.error(
            request, "Something Went Wrong. You need to be Logged In to cancel order!")
        return redirect("/")


def orderDelete(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            orderid = (request.POST['id'].strip())[3::1]

            try:
                order = Order.objects.get(orderId=orderid)
                if(request.user.id == order.orderedBy):
                    order.delete()
                    return redirect("/history/")
                else:
                    messages.error(
                        request, "Something Went Wrong. You are not authorized to delete this order !")
                    return redirect("/")

            except ObjectDoesNotExist:
                messages.error(
                    request, "Something Went Wrong. Could not delete the non-existential order !")
                return redirect("/")

        else:
            messages.error(
                request, "Something Went Wrong. Could not delete the order!")
            return redirect("/")
    else:
        messages.error(
            request, "Something Went Wrong. You need to be Logged In to delete order!")
        return redirect("/")


def orderDetail(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            orderid = (request.POST['id'].strip())[3::1]

            try:
                order = Order.objects.get(orderId=orderid)
                if(request.user.id == order.orderedBy):
                    updates = ({'itemsJson': order.itemsJson, 'totalAmt': order.totalAmt, 'email': order.email, 'phone': order.phone,
                                'address': order.address, 'method': order.method, 'payment': order.payment, 'orderDate': order.orderDate,
                                'date': order.date, 'time': order.time, 'notetodriver': order.noteToDriver})
                    response = json.dumps(updates, default=str)
                    return HttpResponse(response)

                else:
                    messages.error(
                        request, "Something Went Wrong. You are not authorized to MR this order !")
                    return redirect("/")

            except ObjectDoesNotExist:
                messages.error(
                    request, "Something Went Wrong. Could not MR the non-existential order !")
                return redirect("/")

        else:
            messages.error(
                request, "Something Went Wrong. Could not MR the order!")
            return redirect("/")
    else:
        messages.error(
            request, "Something Went Wrong. You need to be Logged In to MR order!")
        return redirect("/")


def orderMR(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            orderid = (request.POST['id'].strip())[3::1]

            try:
                order = Order.objects.get(orderId=orderid)
                if(request.user.id == order.orderedBy):
                    order.orderStatus = 'Marked As Received'
                    order.save()
                    return redirect("/history/")
                else:
                    messages.error(
                        request, "Something Went Wrong. You are not authorized to MR this order !")
                    return redirect("/")

            except ObjectDoesNotExist:
                messages.error(
                    request, "Something Went Wrong. Could not MR the non-existential order !")
                return redirect("/")

        else:
            messages.error(
                request, "Something Went Wrong. Could not MR the order!")
            return redirect("/")
    else:
        messages.error(
            request, "Something Went Wrong. You need to be Logged In to MR order!")
        return redirect("/")


def orderGF(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            orderid = (request.POST['id'].strip())[3::1]

            try:
                order = Order.objects.get(orderId=orderid)
                if(request.user.id == order.orderedBy):
                    order.feedback = request.POST['feedback'].strip()
                    order.save()
                    return redirect("/history/")
                else:
                    messages.error(
                        request, "Something Went Wrong. You are not authorized to provide feedback on this order !")
                    return redirect("/")

            except ObjectDoesNotExist:
                messages.error(
                    request, "Something Went Wrong. Could not provide feedback on the non-existential order !")
                return redirect("/")

        else:
            messages.error(
                request, "Something Went Wrong. Could not provide feedback on the order!")
            return redirect("/")
    else:
        messages.error(
            request, "Something Went Wrong. You need to be Logged In to provide feedback on order!")
        return redirect("/")
