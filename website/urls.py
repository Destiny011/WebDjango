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
from blog.views \
    import nettest,delyUID,updateUi,login,advCase,addllCase2,\
    HomePage,info,listTo,list_ui,addCase,addCase2,JsonPlay,\
    tips,sdftest,cate,details,jzMonin,house_edit,Perport,JArAPi


urlpatterns=[

# 管理平台数据映射
    url(r'indes$',HomePage),
# 添加数据平台
    url(r'info.html$', info),
# 显示数据的列表页面
    url(r'list.html$', listTo),
# 显示管理的列表页面
    url(r'login.html$', login),
# 显示ui自动化测试用例
    url(r'list_ui$',list_ui),
# 跳转到添加自动化测试用例
    url(r'add.html$', addCase),
# 跳转到添加自动化模块用例
    url(r'adv.html$', advCase),
# 添加模块
    url(r'addll$', addllCase2),
# 添加自动化测试用例
    url(r'addl$', addCase2),
# 删除自动化测试用例
    url(r'deleteUi$', delyUID),
# 修改/更新自动化测试用例
    url(r'updateUi$', updateUi),
# 更新成功logo自动化测试用例
    url(r'tips$', tips),
# 运行接口数据的程序
    url(r'showdftest$', sdftest),
# 接口测试完后运行的页面
    url(r'cate.html$', cate),
# 接口详情查询
    url(r'details.html$', details),
# 查询接口文档的数据
    url(r'nettest.html$', nettest),


# 家在监控页面
    url(r'jzMonin.html$', jzMonin),
# 详情页面
    url(r'house_edit.html$', house_edit),
# 报告详情页
    url(r'Perport.html$',Perport),
# 接口详情页
    url(r'JSonDisplay.html',JsonPlay),
# 单独执行接口
    url(r'JArAPi',JArAPi)
]

