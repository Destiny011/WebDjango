import builtins

import jpype
from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect,HttpResponse
import os
import urllib,urllib.request,re
from django.views.decorators.csrf import csrf_exempt
from .models import person,log_report,NetTest,UiManage,module,ios_Mode,ios_controls,webject,Tlog,blog_program
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.conf import  settings
from jpype import *



#自动化登录列表
def login(request):
    libid = request.GET['libid']
    date = webject.objects.filter(libid=libid)
    datc = webject.objects.get(id=libid)
    return render_to_response('ManageSite/login.html', {'webject': date,'web':datc})

#自动测试用例展现首页
def HomePage(request):
    b = module.objects.all()
    d = webject.objects.filter(libUearid=0)
    return render_to_response('ManageSite/index.html', {'date': b,'webject':d})

#自动测试用例展现首页
def info(request):
    b = module.objects.all()
    return render_to_response('ManageSite/info.html', {'data': b})

# 显示数据的页面
def listTo(request):
    b = person.objects.all()
    return render_to_response('ManageSite/list.html', {'data': b})

# UI自动化测试用例
def list_ui(request):
    try:
        Test_steps = request.GET['Test_steps']
        b = UiManage.objects.filter(Test_steps=Test_steps)
        return render_to_response('ManageSite/list_ui.html', {'data': b})
    except :
        b = UiManage.objects.all()
        return render_to_response('ManageSite/list_ui.html', {'data': b})

#跳转到添加自动化测试用例
def addCase(request):
    Project = request.GET['Project']
    b = module.objects.filter(Project=Project)
    c = UiManage.objects.all()
    d = ios_controls.objects.all()
    f = ios_Mode.objects.all()
    return render_to_response('ManageSite/add.html', {'bi': b, 'bate': c,'di': d, 'fi': f})

#跳转到添加自动化测试用例
def advCase(request):

    return render_to_response('ManageSite/adv.html')

#添加自动化测试用例
@csrf_exempt
def addCase2(request):
    #c={}
    id = request.POST['id']
    Test_Detion = request.POST['Test_Detion']
    Test_steps = request.POST['Test_steps']
    Test_object = request.POST['Test_object']
    Positioning = request.POST['Positioning']
    Object_entities = request.POST['Object_entities']
    Op_method = request.POST['Op_method']
    Test_data = request.POST['Test_data']
    st = UiManage()
    if len(id) > 0:
        print("id不是null")
        st.id = id
    st.Test_Detion = Test_Detion
    st.Test_steps = Test_steps
    st.Test_object = Test_object
    st.Positioning = Positioning
    st.Object_entities = Object_entities
    st.Op_method = Op_method
    st.Test_data = Test_data
    st.save()
    return render_to_response('ManageSite/tips.html')

# 添加模块
@csrf_exempt
def addllCase2(request):
    Test_steps = request.POST['Test_steps']
    module1 = request.POST['module']
    st = module()
    if len(Test_steps) > 0:
        print("id不是null")
        st.Test_steps = Test_steps
    st.module = module1
    st.save()
    return HttpResponseRedirect('ManageSite/tips.html')

# 删除数据UI自动化测试用例
def delyUID(request):
    id = request.GET['id'];
    bb = UiManage.objects.get(id=id)
    bb.delete()
    return HttpResponseRedirect("/list_ui")

# 修改数据UI自动化测试用例
def updateUi(request):
    id = request.GET['id']
    bb = UiManage.objects.get(id=id)
    ic = request.GET['Test_steps']
    cc = module.objects.get(Test_steps=ic)
    b = module.objects.all()
    c = UiManage.objects.all()
    d = ios_controls.objects.all()
    f = ios_Mode.objects.all()
    return render_to_response('ManageSite/add.html', {'d': bb,'b':cc,'bi': b, 'bate': c,'di': d, 'fi': f})

# 执行接口数据的程序/直接查看内容
def sdftest(request):
    after_range_num = 5
    before_range_num = 6
    try:
        DomainName = request.GET['DomainName']
        path = "D:\\website\\TinfaceTest\\CaseTest\\RequestApi.py"
        # 执行内网数据的程序---内网找房
        if DomainName == "ddzf-webapi.test.szhome.com":
            sysUrl = "python %s %s %s"% (path, 1, 0)
        # 执行线上测试数据的程序---线上测试找房
        elif  DomainName == "dongdong-webapi.test.szhome.com":
            sysUrl = "python %s %s %s" % (path, 1, 1)
        # 执行线上正式数据的程序---找房
        elif  DomainName == "ddzf-webapi.szhome.com":
            sysUrl = "python %s %s %s" % (path, 1, 2)
        # 执行线上正式数据的程序---内网抢客
        elif DomainName == "ddqk-webapi.test.szhome.com":
            sysUrl = "python %s %s %s" % (path, 2, 3)
        # 执行线上正式数据的程序---线上测试抢客
        elif DomainName == "dongdongbroker-webapi.test.szhome.com":  # 有BUG
            sysUrl = "python %s %s %s" % (path, 2, 4)
        # 执行线上正式数据的程序---抢客
        elif DomainName == "ddqk-webapi.szhome.com":
            sysUrl = "python %s %s %s" % (path, 2, 5)
        # 执行线上正式数据的程序---内网家在
        elif DomainName == "webapitest.bbs.szhome.com":
            sysUrl = "python %s %s %s" % (path, 3, 6)
        # 执行线上正式数据的程序---家在
        elif DomainName == "bbs-webapi.szhome.com":
            sysUrl = "python %s %s %s" % (path, 3, 7)
        # 执行线上正式数据的程序---哇窝
        elif DomainName == "wawo-webapi.szhome.com":
            sysUrl = "python %s %s %s" % (path, 4, 8)
        # 执行线上正式数据的程序---内网哇窝
        elif DomainName == "wawo-webapi.szhome.com":
            sysUrl = "python %s %s %s" % (path, 4, 9)

        print(sysUrl)
        # 执行DOC编译程序
        os.system(sysUrl)
    except :
        DomainName = request.GET['Domain']
    # person 程序异常列表
    datc = person.objects.filter(DomainName=DomainName)
    # 程序执行情况列表
    dare = Tlog.objects.filter(DomainName=DomainName)
    # blog_program 报错列表
    darb = blog_program.objects.filter(DomainName=DomainName)
    paginator = Paginator(darb,10)
    page =  int(request.GET.get("page",1))
    try :
        contacts = paginator.page(page)
    except PageNotAnInteger:
        contacts =paginator.page(1)
    except EmptyPage:
        contacts = paginator.page(paginator.num_pages)
    if page >= after_range_num:
        page_range = paginator.page_range[page - after_range_num:page + before_range_num]
    else:
        page_range = paginator.page_range[0:int(page) + before_range_num]
    return  render(request,'ManageSite/cate.html',{'dacc': datc, 'Tlog': dare,
                                                   "guests":contacts,"Tpage": page_range})



#状态自动化测试用例
def tips(request):
    return render_to_response('ManageSite/tips.html')


#接口完成后的程序页面
def cate(request):
    return render_to_response('ManageSite/cate.html')

#单个接口查看详情
def details(request):
    id = request.GET['id']
    ll = request.GET['ll']
    if   ll == '0':
        bb =person.objects.get(id=id)
    elif ll == '1':
        bb=blog_program.objects.get(id=id)
    elif ll =='2':
        bb = NetTest.objects.get(id=id)

    return render_to_response('ManageSite/details.html',{'person': bb})



#接口文档数据展示
def nettest(request):
    after_range_num = 5
    before_range_num = 6
    DomainName = request.GET['Domain']
    dd = NetTest.objects.filter(DomainName=DomainName)
    paginator = Paginator(dd, 20)
    page = int(request.GET.get("page", 1))
    try :
        contacts = paginator.page(page)
    except PageNotAnInteger:
        contacts =paginator.page(1)
    except EmptyPage:
        contacts = paginator.page(paginator.num_pages)
    if page >= after_range_num:
        page_range = paginator.page_range[page - after_range_num:page + before_range_num]
    else:
        page_range = paginator.page_range[0:int(page) + before_range_num]

    return render(request,'ManageSite/cate.html', {'Pro': dd,"Tpage":page_range,"guests":contacts})


# 监控显示效果
def jzMonin(request):
    url = request.GET['url']
    Title = urllibTitle(url)
    return render(request,'Monitoring/Relist.html',{'listClass': Title,'URL':url})



# 详情页面显示
def house_edit(request):
    Sys = request.GET['Sy']
    (Texterror,Textlist)= urllibData(Sys)
    Tp= []
    for i in Textlist:
        Tp.append(i[1])
    return render(request, 'Monitoring/Reedit.html',
                  {'Pro': Textlist,'Sys':Sys,'URL':settings.HTMLURL,'Texterror':Texterror,'Array':Tp})


# 详情页面显示
def Perport(request):
    ys = 'Monitoring/JzPerport.html'
    return render(request, ys)


# 单独执行接口--直接调用jar Api
def JArAPi(request):
    jarpath = os.path.join(os.path.abspath('.'),'libs/test.jar')
    if not jpype.isJVMStarted():
        jpype.startJVM(jpype.getDefaultJVMPath(), "-ea", "-Djava.class.path=%s" % jarpath)
    else:
        jpype.attachThreadToJVM()
    Test = jpype.JClass('testPye.test')
    T=Test.Dongdongtest("1aa")
    F=Test.Dongdongtest222("1aasdsadasda")
    # jpype.shutdownJVM()
    return  HttpResponse("hello")

# 独自接口查看详情数据
def JsonPlay(request):
    return  render(request,"Monitoring/JSonDisplay.html")




# 请求网页地址返回的数据
def gethtml(url):
    urlText = urllib.request.urlopen(url)
    HtmlXml = urlText.read()
    settings.HTMLTEST = HtmlXml
    settings.HTMLURL = url
    return HtmlXml

# 抓取接口文档里面单独的类 内容
def urllibData(Sys):
    ConTent = re.findall(r"<tbody>[\s\S]*?</tbody>", settings.HTMLTEST.decode('utf-8'))
    Textlist = []
    Texterror = []
    for i in ConTent:  #循环取出不同Tbody的数据
        id = (re.findall(r"<span id=.*?>", i))[0].replace("<span id=", "").replace(">", "").replace('"','')
        Stey = re.findall(r"<tr class[\s\S]*?</tr>", i)
        for Data in Stey:  #判断
            Unxind = []
            if Sys == id:
                delete = (re.findall(r'<tr class=".*?">', Data))[0].replace('<tr class="', '').replace('">', '')
                Data = Data.replace("\r\n", "").replace('<tr class="">', '').replace('</tr>', '')
                Data = re.findall(r">.*?</td>", Data)
                Name = (re.findall(r'>.*?</td>', Data[0]))[0].replace('<td style="text-align: center;width:20%">', "") \
                    .replace(" ", "").replace('>', "").replace("</td", "")
                title = (re.findall(r'">.*?</a>', Data[1]))[0].replace('">', "").replace("</a>", "")
                titlel = (re.findall(r'=.*? t', Data[1]))[0].replace("=", "").replace('" t', "").replace('"', '')
                Details = Data[2].replace(" ", "").replace(">", "").replace("</td", "") \
                    .replace('<spanclass="wiki_icon_safe"</span', "").replace('<spanclass="wiki_icon_new"</span', "")
                Unxind.append(Name)
                Unxind.append(titlel)
                Unxind.append(title)
                Unxind.append(Details)
                if (delete == 'delete'):
                    Textlist.append(Unxind)
                else:
                    Texterror.append(Unxind)
    return Textlist,Texterror


# 抓取接口文档类名
def urllibTitle(url):
    HtmlXml = gethtml(url)
    content2 = re.findall(r'<ul class="clearfix"[\s\S]*? </ul>', HtmlXml.decode('utf-8'))
    U = []
    for i in content2:  # 此处要这样输出，要不然会有乱码
        tst = re.findall(r"<a href=.*?>.*?</a>", i)
        for k in tst:
            l = []
            ming = (re.findall(r'#.*?"', k))[0].replace("#", "").replace('"', '')
            Name = (re.findall(r'>.*?<', k))[0].replace("<", "").replace(">", "")
            l.append(ming)
            l.append(Name)
            U.append(l)
    return U


