from django.db import models

# Create your models here.

class Program(models.Model):

    StatsCode=models.TextField()
    URL=models.TextField()
    Response=models.TextField()
    Time = models.TextField()


class person(models.Model):
    DomainName=models.TextField()
    MymeThod = models.TextField()
    MyName =models.TextField()
    Myurl = models.TextField()
    ExpEcted = models.TextField()
    Time = models.TextField()
    class Meta:
        db_table = 'person'

class NetTest(models.Model):
    DomainName=models.TextField()
    MymeThod = models.TextField()
    MyName =models.TextField()
    Myurl = models.TextField()
    ExpEcted = models.TextField()
    Time = models.TextField()
    class Meta:
        db_table = 'NetTest'


class blog_program(models.Model):
    DomainName=models.TextField()
    MymeThod = models.TextField()
    MyName =models.TextField()
    Myurl = models.TextField()
    ExpEcted = models.TextField()
    Time = models.TextField()
    class Meta:
        db_table = 'blog_program'

class log_report(models.Model):
    StatsCode=models.TextField()
    URL=models.TextField()
    Response=models.TextField()
    SocketException = models.TextField()
    Time = models.TextField()
    class Meta:
        db_table = 'log_report'

class UiManage(models.Model):
    Case_Detion=models.TextField()
    Test_steps=models.TextField()
    Test_Detion=models.TextField()
    Test_object=models.TextField()
    Positioning=models.TextField()
    Object_entities=models.TextField()
    Op_method=models.TextField()
    Test_data=models.TextField()
    Test_results=models.TextField()
    results = models.TextField()
    class Meta:
        db_table = 'UiManage'


class module(models.Model):
    Test_steps=models.TextField()
    module=models.TextField()
    Project=models.TextField()
    class Meta:
        db_table = 'module'

class ios_Mode(models.Model):
    oper_id=models.TextField()
    Op_method=models.TextField()
    class Meta:
        db_table = 'ios_Mode'


class ios_controls(models.Model):
    set_id=models.TextField()
    Positioning =models.TextField()
    class Meta:
        db_table = 'ios_controls'


class webject(models.Model):
    libid=models.TextField()
    libUearid =models.TextField()
    libContext = models.TextField()
    libjectid = models.TextField()
    libURL = models.TextField()
    URLid = models.TextField()
    class Meta:
        db_table = 'webject'



class Tlog(models.Model):
    Abmar_pro=models.TextField()
    error =models.TextField()
    DomainName = models.TextField()
    through= models.TextField()
    class Meta:
        db_table = 'Tlog'

