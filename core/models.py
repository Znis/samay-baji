from django.db import models
from django.db.models.fields import Field
from phonenumber_field.modelfields import PhoneNumberField

class Menu(models.Model):
  idname = models.CharField(max_length=20) 
  name=models.CharField(max_length=50)
  quantity=models.CharField(max_length=40)
  price=models.CharField(max_length=20)
  isPopular=models.BooleanField(default=False)
  image=models.ImageField(upload_to='images/')

  def __str__(self):
      return self.name

class HomePage(models.Model):
    main_title = models.CharField(max_length=100)
    main_paragraph = models.TextField(blank = True)
    main_image = models.ImageField(upload_to = 'images/')
    aboutUs_title = models.CharField(max_length=50)
    aboutUs_paragraph = models.TextField(blank = True)
    aboutUs_image =  models.ImageField(upload_to = 'images/')
    download_title = models.CharField(max_length=50)
    download_subtitle = models.CharField(max_length=100)
    download_phoneimg =  models.ImageField(upload_to = 'images/')
    contact_address = models.CharField(max_length=40)
    contact_email = models.CharField(max_length=40)
    contact_num1 = models.CharField(max_length=20)
    contact_num2 = models.CharField(max_length=20)

    def __str__(self):
      return "Homepage Details"



class Order(models.Model):
    orderId = models.AutoField(primary_key=True)
    orderedBy = models.IntegerField(blank = False)
    itemsJson = models.CharField(max_length=100)
    totalAmt = models.CharField(max_length=10)
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=100)
    phone = PhoneNumberField(null=False, blank=False)
    address = models.CharField(max_length=50)
    method = models.CharField(max_length=20)
    payment = models.CharField(max_length=40)
    orderDate = models.CharField(max_length=20)
    date = models.CharField(max_length=20)
    time = models.CharField(max_length=20)
    noteToDriver = models.TextField(blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    feedback = models.TextField(blank=True)
    CHOICES = [('Validating Order','Validating Order'),('Marked As Received','Marked As Received'),('En Route','En Route'),('Order Delivered','Order Delivered'),('Order Cancelled','Order Cancelled'),('Item Out of Stock','Item Out of Stock'),('Could Not Be Shipped To The Destination Location','Could Not Be Shipped To The Destination Location')]
    orderStatus = models.CharField(max_length=50,choices=CHOICES,default=CHOICES[0][1])

    def __str__(self):
      return ("Order By " + self.name + " ID: " + str(self.orderId))


class FeedBack(models.Model):
    FeedbackId = models.AutoField(primary_key=True)
    fname = models.CharField(max_length=50)
    femail = models.EmailField(max_length=100)
    ftext = models.TextField(blank=True)

    def __str__(self):
      return ("Feedback By " + self.fname)




