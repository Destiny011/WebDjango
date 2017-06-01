from django.db import models

# Create your models here.


class Student(models.Model):
    name=models.CharField(max_length=20)
    age=models.CharField(max_length=3)


class Subject(models.Model):
    student=models.ForeignKey(Student)
    sub_name=models.CharField(max_length=20)
    sub_num=models.IntegerField(default=0)

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

class log_report(models.Model):
    StatsCode=models.TextField()
    URL=models.TextField()
    Response=models.TextField()
    SocketException = models.TextField()
    Time = models.TextField()
    class Meta:
        db_table = 'log_report'

class Use_Cases(models.Model):
    CaseDescription = models.TextField()
    steps = models.TextField()
    TestDescription = models.TextField()
    TestObject = models.TextField()
    PositioningWay = models.TextField()
    TestObjectEntities = models.TextField()
    OperationMethod = models.TextField()
    TestData = models.TextField()
    TestResults = models.TextField()
    AssertionResults = models.TextField()
    class Meta:
        db_table = 'Use_Cases'
