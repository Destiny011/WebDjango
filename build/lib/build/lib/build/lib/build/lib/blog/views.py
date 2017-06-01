import builtins
from django.shortcuts import render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect
import os

# 包装csrf请求，避免django认为其实跨站攻击脚本
from django.views.decorators.csrf import csrf_exempt
from .models import Program,person,log_report

# 保存数据
@csrf_exempt
def add(request):
    # c={}
    id = request.POST['id']
    URL = request.POST['URL']
    StatsCode = request.POST['StatsCode']
    Response = request.POST['Response']
    st = Program()
    if len(id) > 0:
        print("id不是null")
        st.id = id
    st.StatsCode = StatsCode
    st.URL = URL
    st.Response = Response
    st.save()
    return HttpResponseRedirect("/q")


# 查询所有
def query(request):
    b = Program.objects.all()
    return render_to_response('curd.html', {'data': b})


# 显示一条数据
def showUid(request):
    id = request.GET['id'];
    bb = Program.objects.get(id=id)
    return render_to_response('update.html', {'data': bb})


# 删除数据
def delByID(request):
    # id = request.GET['id'];
    # bb = Program.objects.get(id=id)
    # bb.delete()
    os.system("python  D:\\website\website\\ScriptT\\SQLine.py")

    return HttpResponseRedirect("/Performance/HomePage")

#接口文档数据展示
def InterFace(request):
    b = person.objects.all()
    return render_to_response('InterFace.html', {'data': b})

#接口文档数据展示
def ErrorCode(request):
    b = log_report.objects.all()
    return render_to_response('ErrorCode.html', {'data': b})

#跳转性能报告界面
def perfor(request):
    return render_to_response('index.html')

#自动测试用例展现首页
def CaseHome(request):
    b = log_report.objects.all()
    return render_to_response('ErrorCode.html', {'data': b})

#添加自动化测试用例
def addCase(request):
    print("+++")

#删除自动化测试用例
def DeletCase(request):
    print("----")
#成功的测试用例

#失败的测试用例