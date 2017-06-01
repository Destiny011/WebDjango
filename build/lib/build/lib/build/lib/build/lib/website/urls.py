"""website URL Configuration

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
from django.conf.urls import url,include
from django.contrib import admin
#导入view定义的方法
from blog.views import add,query,delByID,showUid,InterFace,ErrorCode,CaseHome,perfor


urlpatterns=[
    # url(r'^blog/index/$', index),
    # url(r'^blog/student/$', student_list),

    #添加数据映射
    url(r'^add$',add),
    #查询所有数据的映射
    url(r'^Performance/HomePage$',query),
    #访问性能报告
    url(r'^index$',perfor),
    #删除用户根据id
    url(r'delete$',delByID),
    #更新的方法，根据id
    url(r'showid$',showUid),
    #查询接口文档的数据
    url(r'Performance/InterFace$',InterFace),
    #查询错误日志的数据
    url(r'Performance/ErrorCode$',ErrorCode),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': '/static/'}),
    #appium 测试用例显示界面
    url(r'CaseHome$',CaseHome)
]

