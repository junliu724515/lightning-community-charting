({
		
    pieChart : function(data, donutChart){

        var config = {
              "type": "pie",
              "dataProvider": data,
              "valueField": "value",
              "titleField": "summary",
               "labelText": "",
               "labelRadius": 1,
               "radius": "42%",  
               "legend":{
                   "position":"bottom",
                   "align": "center"
                   
               },
               "balloon":{
               "fixedPosition":true
              },
              "export": {
                "enabled": true
              }
            }
        
        if (donutChart){
            
            config.innerRadius="60%";
        }
        
        var chart = AmCharts.makeChart( "chartdiv", config);
        
    },
    
    barChart : function(data, isHorizontal, lineColor){
        
         var config = {
          "type": "serial",
          "dataProvider": data,
          "rotate":isHorizontal,
          "valueAxes": [{
            "axisAlpha": 0,
            "position": "left",
            "title": ""
          }],
          "startDuration": 1,
          "graphs": [{
            "balloonText": "<b>[[category]]: [[value]]</b>",
            "fillAlphas": 0.9,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "value",
            "lineColor": lineColor
          }],
          "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
          },
          "categoryField": "summary",
          "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 90
          },
          "export": {
            "enabled": true
          }
        
        };
        
       /*      
        if (lineColor!==undefined || lineColor!='') {
            
            var graphs = config.graphs;           
            graphs[0].lineColor = lineColor,
        }
*/
         //Bar chat
          var chart = AmCharts.makeChart("chartdiv", config); 
        
        
    },
    
    lineChart : function(data, lineColor){
        
         //Bar chat
          var chart = AmCharts.makeChart("chartdiv", {
          "type": "serial",
          "theme": "light",
          "dataProvider": data,
          "valueAxes": [{
            "axisAlpha": 0,
            "position": "left",
            "title": ""
          }],
          "startDuration": 1,
          "graphs": [{
            "balloonText": "<b>[[category]]: [[value]]</b>",
            "fillAlphas": 0,
            "lineAlpha": 0.2,
            "type": "line",
            "bullet" : "round",
            "lineColor" : lineColor,
            "valueField": "value"
          }],
          "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
          },
          "categoryField": "summary",
          "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 90
          },
          "export": {
            "enabled": true
          }
        
        });
     },
    
    funnelChart: function(data){
        
        var chart = AmCharts.makeChart( "chartdiv", {
          "type": "funnel",
          "theme": "light",
          "dataProvider": data,
          "titleField": "summary",
         
          "legend":{
              "position":"right",
              "align": "center"
              
          },
          "labelText":"",
          "labelPosition": "center",
          "funnelAlpha": 0.9,
          "valueField": "value",
          "startX": 0,
          "neckWidth": "40%",
          "startAlpha": 0,
          "outlineThickness": 1,
          "neckHeight": "30%",
          "balloonText": "[[title]]:<b>[[value]]</b>",
          "export": {
            "enabled": true
          }
        } );
      
        
    },
    
   
    
    horizontalBarGrouped: function(data, xValue, yValue){
        
      var chart = AmCharts.makeChart("chartdiv", {
            "type": "serial",
             "theme": "light",
            "categoryField": xValue,
            "rotate": true,
            "startDuration": 1,
            "categoryAxis": {
                "gridPosition": "start",
                "position": "left"
            },
            "trendLines": [],
            "graphs": [
                {
                    "balloonText": "[[value]]",
                    "fillAlphas": 0.8,
                    "id": "AmGraph-1",
                    "lineAlpha": 0.2,
                    "title": "Income",
                    "type": "column",
                    "valueField": yValue
                },    
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "position": "top",
                    "axisAlpha": 0
                }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [],
            "dataProvider": data,
            "export": {
                "enabled": true
             }
        
        });  
    },
    
    verticalBar: function(data, xValue, yValue) {
        
        var chart = new AmCharts.AmSerialChart();
        chart.dataProvider = data;
        chart.categoryField = xValue;
        chart.theme="light";
       // chart.rotate="true";
        
        var categoryAxis = chart.categoryAxis;
        categoryAxis.gridPosition = "start";
        categoryAxis.labelRotation = 90;
        
        var legend = new AmCharts.AmLegend();
        legend.position="bottom";
        legend.align="center";
        chart.addLegend(legend); 
        
        var graph = new AmCharts.AmGraph();
        graph.valueField = yValue;
      //  graph.title= yValue;
        graph.type = "column";
        graph.fillAlphas = 0.8;
        graph.lineAlpha = 0.3;
        graph.lineColor = "#2574A9",
        chart.addGraph(graph);

        chart.write('chartdiv');
    
    },
    
    scatter: function (data) {
        
        var chart = new AmCharts.AmXYChart();
        chart.dataProvider = data;
        chart.theme="light";
        
        var graph = new AmCharts.AmGraph();
        graph.bullet = "diamond";
        graph.valueField  = "value0";
        graph.xField = "x0";
        graph.yField = "y0";
        graph.lineAlpha = 0;
        graph.lineColor = "#2574A9",
        chart.addGraph(graph);
        
        chart.write('chartdiv');
    },
    
    scatterGrouped: function (data) {
        
        var chart = new AmCharts.AmXYChart();
        chart.dataProvider = data;
        chart.theme="light";
        
        var graph = new AmCharts.AmGraph();
        graph.bullet = "diamond";
        graph.valueField  = "value0";
        graph.xField = "x0";
        graph.yField = "y0";
        graph.lineAlpha = 0;
        graph.lineColor = "#2574A9",
        chart.addGraph(graph);
        
        var graph1 = new AmCharts.AmGraph();
        graph1.bullet = "circle";
        graph1.valueField  = "value1";
        graph1.xField = "x1";
        graph1.yField = "y1";
        graph1.lineAlpha = 0;
       // graph1.lineColor = "#2574A9",
        chart.addGraph(graph1);
        
        chart.write('chartdiv');
    }
    
    
    
})