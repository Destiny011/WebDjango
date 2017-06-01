/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();
    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter)
        regexp = new RegExp(seriesFilter, 'i');

    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            var newRow = tBody.insertRow(-1);
            for(var col=0; col < item.data.length; col++){
                var cell = newRow.insertCell(-1);
                cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 98.63945578231292, "KoPercent": 1.3605442176870748};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
               "color" : "red"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "blue"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round(series.percent)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9608843537414966, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)  ", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "circle/getrelationcircle"], "isController": false}, {"data": [1.0, 500, 1500, "operatelog/insertoperatelog"], "isController": false}, {"data": [1.0, 500, 1500, "demand/senddemandv4"], "isController": false}, {"data": [1.0, 500, 1500, "system/gettoken"], "isController": false}, {"data": [1.0, 500, 1500, "demand/getdemandhousev3"], "isController": false}, {"data": [1.0, 500, 1500, "circle/getmyconcertlistv2"], "isController": false}, {"data": [1.0, 500, 1500, "/circle/getmyconcerttype"], "isController": false}, {"data": [1.0, 500, 1500, "circle/gettopiccirclelistv3"], "isController": false}, {"data": [1.0, 500, 1500, "housesource/gethousesourcev4"], "isController": false}, {"data": [1.0, 500, 1500, "circle/getuserphoto"], "isController": false}, {"data": [0.5, 500, 1500, "group/getgroupqrcodeurl"], "isController": false}, {"data": [1.0, 500, 1500, "demand/deletedemandbyid"], "isController": false}, {"data": [1.0, 500, 1500, "broker/getnearbybrokerbranchv2"], "isController": false}, {"data": [1.0, 500, 1500, "demand/revocationdemand"], "isController": false}, {"data": [1.0, 500, 1500, "broker/getsearchdistrictlist"], "isController": false}, {"data": [1.0, 500, 1500, "friend/getblacklist"], "isController": false}, {"data": [1.0, 500, 1500, "demand/getdemandinfobyidv2"], "isController": false}, {"data": [0.5, 500, 1500, "bol/bolprojectsearchlistv3"], "isController": false}, {"data": [1.0, 500, 1500, "groupfile/getgroupfilelist"], "isController": false}, {"data": [0.5, 500, 1500, "circle/getcirclezanlist"], "isController": false}, {"data": [1.0, 500, 1500, "topic/gettopicinfo"], "isController": false}, {"data": [1.0, 500, 1500, "circle/getlastcircleid"], "isController": false}, {"data": [1.0, 500, 1500, "circle/getconcertrelation"], "isController": false}, {"data": [1.0, 500, 1500, "friend/getfriendlistv3"], "isController": false}, {"data": [1.0, 500, 1500, "circle/getmyconcertcirclelistv3"], "isController": false}, {"data": [1.0, 500, 1500, "bol/bolprojectautocomplete"], "isController": false}, {"data": [1.0, 500, 1500, "circle/cancelsingleconcert"], "isController": false}, {"data": [1.0, 500, 1500, "group/getgroupinfo"], "isController": false}, {"data": [1.0, 500, 1500, "secondhousesource/housesearchlistv2"], "isController": false}, {"data": [1.0, 500, 1500, "circle/getcirclereplyv3"], "isController": false}, {"data": [1.0, 500, 1500, "circle/getrecommendsuser"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "circle/getcircledetailv3"], "isController": false}, {"data": [1.0, 500, 1500, "rentdemand/getallrentdemandhouselistv2"], "isController": false}, {"data": [1.0, 500, 1500, "user/gethomepagev2"], "isController": false}, {"data": [1.0, 500, 1500, "user/getuserinfov2"], "isController": false}, {"data": [1.0, 500, 1500, "group/getmygrouplist"], "isController": false}, {"data": [1.0, 500, 1500, "获取Login的值"], "isController": false}, {"data": [1.0, 500, 1500, "housesource/getfavourablehousev2"], "isController": false}, {"data": [1.0, 500, 1500, "chat/getlocalaccidlist"], "isController": false}, {"data": [1.0, 500, 1500, "circle/deletecontent"], "isController": false}, {"data": [1.0, 500, 1500, "topic/gethometopicv2"], "isController": false}, {"data": [1.0, 500, 1500, "groupuser/getgroupuserlist"], "isController": false}, {"data": [1.0, 500, 1500, "circle/addsingleconcert"], "isController": false}, {"data": [1.0, 500, 1500, "ad/getad"], "isController": false}, {"data": [1.0, 500, 1500, "topic/collectiontopic"], "isController": false}, {"data": [1.0, 500, 1500, "circle/publishcirclev4"], "isController": false}, {"data": [1.0, 500, 1500, "circle/isallowcircle"], "isController": false}, {"data": [1.0, 500, 1500, "/demand/deletedemandbyid"], "isController": false}, {"data": [1.0, 500, 1500, "demand/getdemandlistv2"], "isController": false}, {"data": [1.0, 500, 1500, "获取Token的值"], "isController": false}, {"data": [1.0, 500, 1500, "circle/getchoicenesscirclelist"], "isController": false}, {"data": [1.0, 500, 1500, "circle/getconcertmelistv2"], "isController": false}, {"data": [1.0, 500, 1500, "friend/invitecount"], "isController": false}, {"data": [1.0, 500, 1500, "circle/getpersoncirclelist"], "isController": false}, {"data": [0.875, 500, 1500, "system/pushoperate"], "isController": false}, {"data": [1.0, 500, 1500, "groupdynamic/getgroupdynamiclist"], "isController": false}, {"data": [1.0, 500, 1500, "circle/getnewcirclelist"], "isController": false}, {"data": [1.0, 500, 1500, "chat/updatechatsetting"], "isController": false}, {"data": [0.5, 500, 1500, "demand/getalldemandhouselistv2"], "isController": false}, {"data": [1.0, 500, 1500, "topic/canceltopic"], "isController": false}, {"data": [1.0, 500, 1500, "user/getsimpleblacklistv3"], "isController": false}, {"data": [1.0, 500, 1500, "demand/getprojectlist"], "isController": false}, {"data": [1.0, 500, 1500, "group/modifygroupinfo"], "isController": false}, {"data": [1.0, 500, 1500, "groupactivity/getgroupactivitylist"], "isController": false}, {"data": [1.0, 500, 1500, "user/loginv2"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 294, 4, 1.3605442176870748, 212.5, 357.25, 2338.3500000002086, 7.166187295861161, 18.277686139582215, 10, 19754], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "90th pct", "95th pct", "99th pct", "Throughput", "KB/sec", "Min", "Max"], "items": [{"data": ["circle/getrelationcircle", 4, 0, 0.0, 28.0, 28.0, 28.0, 0.5385754678874377, 0.16357126026659485, 17, 28], "isController": false}, {"data": ["operatelog/insertoperatelog", 8, 0, 0.0, 68.0, 68.0, 68.0, 0.9515879624122755, 0.2927248126561199, 23, 68], "isController": false}, {"data": ["demand/senddemandv4", 4, 0, 0.0, 319.0, 319.0, 319.0, 0.4060089321965083, 0.14947789788875354, 63, 319], "isController": false}, {"data": ["system/gettoken", 2, 0, 0.0, 317.0, 317.0, 317.0, 0.2594706798131811, 0.2658054132070576, 39, 317], "isController": false}, {"data": ["demand/getdemandhousev3", 2, 0, 0.0, 230.0, 230.0, 230.0, 0.07287301876480233, 0.6759257150664966, 220, 230], "isController": false}, {"data": ["circle/getmyconcertlistv2", 2, 0, 0.0, 201.0, 201.0, 201.0, 0.25716857400025717, 0.663012729844413, 181, 201], "isController": false}, {"data": ["/circle/getmyconcerttype", 2, 0, 0.0, 34.0, 34.0, 34.0, 0.07001575354454752, 0.03128145238928759, 24, 34], "isController": false}, {"data": ["circle/gettopiccirclelistv3", 2, 0, 0.0, 260.0, 260.0, 260.0, 0.26371308016877637, 3.29255051753692, 204, 260], "isController": false}, {"data": ["housesource/gethousesourcev4", 2, 0, 0.0, 269.0, 269.0, 269.0, 0.255656397801355, 2.108166624057267, 238, 269], "isController": false}, {"data": ["circle/getuserphoto", 66, 0, 0.0, 40.300000000000004, 43.65, 59.0, 2.13357470744165, 2.0824956964828343, 15, 59], "isController": false}, {"data": ["group/getgroupqrcodeurl", 4, 0, 0.0, 19754.0, 19754.0, 19754.0, 0.14634324808839133, 0.05402123806387883, 192, 19754], "isController": false}, {"data": ["demand/deletedemandbyid", 2, 0, 0.0, 85.0, 85.0, 85.0, 0.07015820675623531, 0.023089175465675096, 54, 85], "isController": false}, {"data": ["broker/getnearbybrokerbranchv2", 2, 0, 0.0, 125.0, 125.0, 125.0, 0.2628120893561104, 3.8700620072273324, 62, 125], "isController": false}, {"data": ["demand/revocationdemand", 2, 0, 0.0, 59.0, 59.0, 59.0, 0.21310602024507191, 0.06950919019712307, 52, 59], "isController": false}, {"data": ["broker/getsearchdistrictlist", 4, 0, 0.0, 28.0, 28.0, 28.0, 0.538865687727334, 0.5193949548699986, 14, 28], "isController": false}, {"data": ["friend/getblacklist", 2, 0, 0.0, 21.0, 21.0, 21.0, 0.07253735673872044, 0.03690621373132163, 19, 21], "isController": false}, {"data": ["demand/getdemandinfobyidv2", 4, 0, 0.0, 76.0, 76.0, 76.0, 0.14639680854957363, 0.07834516707535776, 58, 76], "isController": false}, {"data": ["bol/bolprojectsearchlistv3", 6, 0, 0.0, 1422.0, 1422.0, 1422.0, 0.14844136566056407, 1.961339528698664, 653, 1422], "isController": false}, {"data": ["groupfile/getgroupfilelist", 2, 0, 0.0, 40.0, 40.0, 40.0, 0.07358081012471948, 0.06869458445237482, 30, 40], "isController": false}, {"data": ["circle/getcirclezanlist", 4, 2, 50.0, 14.0, 14.0, 14.0, 0.14594811544495934, 0.04746164301090962, 10, 14], "isController": false}, {"data": ["topic/gettopicinfo", 2, 0, 0.0, 84.0, 84.0, 84.0, 0.2607561929595828, 0.26839553455019555, 44, 84], "isController": false}, {"data": ["circle/getlastcircleid", 4, 0, 0.0, 24.0, 24.0, 24.0, 0.5265236277477952, 0.19230452810319862, 15, 24], "isController": false}, {"data": ["circle/getconcertrelation", 14, 0, 0.0, 88.5, 104.0, 104.0, 0.5094243504839532, 0.29301849847172695, 11, 104], "isController": false}, {"data": ["friend/getfriendlistv3", 4, 0, 0.0, 70.0, 70.0, 70.0, 0.14670285337049807, 0.6396760159172596, 57, 70], "isController": false}, {"data": ["circle/getmyconcertcirclelistv3", 2, 0, 0.0, 142.0, 142.0, 142.0, 0.2594706798131811, 3.0211610502075765, 137, 142], "isController": false}, {"data": ["bol/bolprojectautocomplete", 3, 0, 0.0, 53.0, 53.0, 53.0, 0.07762368039743324, 0.023575160745704822, 35, 53], "isController": false}, {"data": ["circle/cancelsingleconcert", 2, 0, 0.0, 65.0, 65.0, 65.0, 0.0699471898716469, 0.024795732347077958, 50, 65], "isController": false}, {"data": ["group/getgroupinfo", 4, 0, 0.0, 47.0, 47.0, 47.0, 0.14717786444918685, 0.24987179428213996, 29, 47], "isController": false}, {"data": ["secondhousesource/housesearchlistv2", 2, 0, 0.0, 356.0, 356.0, 356.0, 0.24163344206838228, 5.83601395433128, 242, 356], "isController": false}, {"data": ["circle/getcirclereplyv3", 2, 0, 0.0, 25.0, 25.0, 25.0, 0.0730033581544751, 0.022171918345743905, 21, 25], "isController": false}, {"data": ["circle/getrecommendsuser", 2, 0, 0.0, 28.0, 28.0, 28.0, 0.2696871628910464, 0.2858841946467098, 26, 28], "isController": false}, {"data": ["circle/getcircledetailv3", 6, 2, 33.333333333333336, 50.0, 50.0, 50.0, 0.21782537665638046, 0.10742364766745326, 17, 50], "isController": false}, {"data": ["rentdemand/getallrentdemandhouselistv2", 4, 0, 0.0, 290.0, 290.0, 290.0, 0.14232342999466288, 2.7070639121152817, 249, 290], "isController": false}, {"data": ["user/gethomepagev2", 2, 0, 0.0, 36.0, 36.0, 36.0, 0.26350461133069825, 0.3198596014492754, 24, 36], "isController": false}, {"data": ["user/getuserinfov2", 22, 0, 0.0, 176.79999999999998, 201.39999999999995, 205.0, 2.617801047120419, 3.0984129581151834, 91, 205], "isController": false}, {"data": ["group/getmygrouplist", 2, 0, 0.0, 103.0, 103.0, 103.0, 0.2610966057441253, 1.271061112924282, 94, 103], "isController": false}, {"data": ["获取Login的值", 2, 0, 0.0, 178.0, 178.0, 178.0, 0.3926958570587081, 0.5292190261142745, 175, 178], "isController": false}, {"data": ["housesource/getfavourablehousev2", 2, 0, 0.0, 56.0, 56.0, 56.0, 0.07344570526238478, 0.11777133597737871, 31, 56], "isController": false}, {"data": ["chat/getlocalaccidlist", 6, 0, 0.0, 39.0, 39.0, 39.0, 0.7846214201647704, 0.5869336014123185, 19, 39], "isController": false}, {"data": ["circle/deletecontent", 4, 0, 0.0, 121.0, 121.0, 121.0, 0.11367188610077013, 0.03674354912046378, 88, 121], "isController": false}, {"data": ["topic/gethometopicv2", 2, 0, 0.0, 23.0, 23.0, 23.0, 0.26399155227032733, 0.28023322003695883, 19, 23], "isController": false}, {"data": ["groupuser/getgroupuserlist", 2, 0, 0.0, 43.0, 43.0, 43.0, 0.26343519494204426, 0.3249205578240253, 35, 43], "isController": false}, {"data": ["circle/addsingleconcert", 3, 0, 0.0, 178.0, 178.0, 178.0, 0.07756948933419522, 0.02888655462184874, 52, 178], "isController": false}, {"data": ["ad/getad", 10, 0, 0.0, 37.5, 38.0, 38.0, 0.350729517396184, 0.30771035002805835, 13, 38], "isController": false}, {"data": ["topic/collectiontopic", 2, 0, 0.0, 74.0, 74.0, 74.0, 0.06990807088678389, 0.022187620154496834, 67, 74], "isController": false}, {"data": ["circle/publishcirclev4", 2, 0, 0.0, 90.0, 90.0, 90.0, 0.2334539512081242, 0.0745502363721256, 86, 90], "isController": false}, {"data": ["circle/isallowcircle", 2, 0, 0.0, 23.0, 23.0, 23.0, 0.24295432458697763, 0.08043116800291546, 11, 23], "isController": false}, {"data": ["/demand/deletedemandbyid", 4, 0, 0.0, 88.0, 88.0, 88.0, 0.4062563477554337, 0.13369959882185659, 54, 88], "isController": false}, {"data": ["demand/getdemandlistv2", 4, 0, 0.0, 34.0, 34.0, 34.0, 0.14678899082568805, 0.15209288990825687, 31, 34], "isController": false}, {"data": ["获取Token的值", 2, 0, 0.0, 91.0, 91.0, 91.0, 0.3984857541342897, 0.4268934299661287, 27, 91], "isController": false}, {"data": ["circle/getchoicenesscirclelist", 2, 0, 0.0, 96.0, 96.0, 96.0, 0.07241653993772178, 1.0513127760880585, 91, 96], "isController": false}, {"data": ["circle/getconcertmelistv2", 2, 0, 0.0, 178.0, 178.0, 178.0, 0.07262427829623444, 0.2514190103126475, 156, 178], "isController": false}, {"data": ["friend/invitecount", 10, 0, 0.0, 32.400000000000006, 33.0, 33.0, 1.1978917105893627, 0.38136005630091036, 15, 33], "isController": false}, {"data": ["circle/getpersoncirclelist", 2, 0, 0.0, 171.0, 171.0, 171.0, 0.2597402597402597, 2.8365969967532467, 116, 171], "isController": false}, {"data": ["system/pushoperate", 4, 0, 0.0, 740.0, 740.0, 740.0, 0.425531914893617, 0.1350565159574468, 35, 740], "isController": false}, {"data": ["groupdynamic/getgroupdynamiclist", 2, 0, 0.0, 53.0, 53.0, 53.0, 0.07352400558782443, 0.3051533435041541, 35, 53], "isController": false}, {"data": ["circle/getnewcirclelist", 4, 0, 0.0, 361.0, 361.0, 361.0, 0.5169294391315585, 6.863449857844404, 140, 361], "isController": false}, {"data": ["chat/updatechatsetting", 2, 0, 0.0, 33.0, 33.0, 33.0, 0.20401917780271345, 0.06236133071508721, 30, 33], "isController": false}, {"data": ["demand/getalldemandhouselistv2", 4, 0, 0.0, 891.0, 891.0, 891.0, 0.13700976194553863, 2.7575890563452647, 645, 891], "isController": false}, {"data": ["topic/canceltopic", 2, 0, 0.0, 83.0, 83.0, 83.0, 0.06988364373318426, 0.022589341870785144, 61, 83], "isController": false}, {"data": ["user/getsimpleblacklistv3", 2, 0, 0.0, 21.0, 21.0, 21.0, 0.27016074564365794, 0.10579537012022154, 20, 21], "isController": false}, {"data": ["demand/getprojectlist", 2, 0, 0.0, 60.0, 60.0, 60.0, 0.268564522626561, 1.696624899288304, 37, 60], "isController": false}, {"data": ["group/modifygroupinfo", 2, 0, 0.0, 326.0, 326.0, 326.0, 0.23126734505087881, 0.07340028041165587, 251, 326], "isController": false}, {"data": ["groupactivity/getgroupactivitylist", 2, 0, 0.0, 33.0, 33.0, 33.0, 0.0735564545788893, 0.13289007907318867, 33, 33], "isController": false}, {"data": ["user/loginv2", 2, 0, 0.0, 185.0, 185.0, 185.0, 0.23823704586063132, 0.3210616438356165, 180, 185], "isController": false}]}, function(index, item){
        switch(index){
            case 3:
                item = item.toFixed(2) + '%';
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Test failed: text expected to contain \/\"StatsCode\":200\/", 5, 125.0, 1.7006802721088434], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);
});
